const socket = io()
import { drawCircle, options } from './utils/progressBar.js'
import { audioTemplate, textTemplate, videoTemplate } from './utils/template.js'
import { changeSVG, formatBytes, formatTime } from './utils/utils.js'

const progress = document.getElementById('progress')
const progressNumber = document.querySelector('.progress-number')
const transfer__container = document.querySelector('.transfer__container')
const panel = document.querySelector('.panel')
const fileSystemTitle = document.querySelector('.file-system-entry__title')
const fileSystemSize = document.querySelector('.file-system-entry__size')
const fileSystemFormat = document.querySelector('.file-system-entry__format')
const filelist__action = document.querySelector('.filelist__action')
const transfer__button = document.querySelector('.transfer__button')
const panel__close = document.querySelector('.panel__close')
const preview__item = document.querySelector('.preview__item')
const preview__title = document.querySelector('.preview__title')
const preview__subtitle = document.querySelector('.preview__subtitle')
const preview__button = document.querySelector('.preview__button')

let audioProgress
let audio
let timeTrack

let arrBuffer = []
let sum = 0
let percent = 0
let play = false
let fileDownloaded = false

function playPause() {
    if (play) {
        audio.pause()
    } else {
        audio.play()
    }
    changeSVG(play)
    play = !play
}

function createDownload(fileName, type, content) {
    let blob = new Blob([content], { type: type });
    let link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click()
    URL.revokeObjectURL(link.href);
}

function updateTimeTrack(time) {
    timeTrack.innerText = formatTime(time)
}

function addLoadingProgressBar() {
    transfer__container.style.display = 'none'
    progress.style.display = 'flex'
}

function updateProgressBarAudio() {

    let percentage = (100 / audio.duration) * audio.currentTime

    audioProgress.style.width = percentage + '%';

    updateTimeTrack(audio.currentTime)
}

function deleteProgressBar() {
    progress.style.display = 'none'
    transfer__container.style.display = 'block'
}

function download() {
    socket.emit('download')
}

function openPanel() {
    panel.classList.add('panel--visible')
}

function closePanel() {
    panel.classList.remove('panel--visible')
}

function addDescription({ name, size, type }) {
    fileSystemTitle.innerText = name
    fileSystemSize.innerText = formatBytes(size)
    fileSystemFormat.innerText = name.slice(name.lastIndexOf('.') + 1)
}

function addSrc(name, size, buffer, element, evnt) {
    console.log(name, size, element);
    element.src = URL.createObjectURL(buffer)

    timeTrack = document.querySelector('.audio-player__time--right')

    element.addEventListener(evnt, () => {
        deleteProgressBar()
        preview__title.innerText = name
        preview__subtitle.innerText = formatBytes(size)

        if (timeTrack) {
            timeTrack.innerText = (element.duration / 60).toFixed(2)
        }
        // URL.revokeObjectURL(element.src)
        openPanel()
    })

}

function createPreviewImage(name, size, buffer) {
    let el = document.createElement('div')
    el.classList.add('preview__image')
    preview__item.append(el)
    let img = document.createElement('img')
    el.append(img)
    addSrc(name, size, buffer, img, 'load')
}

function createPreviewAudio(name, size, buffer) {

    preview__item.innerHTML = audioTemplate()

    let audioPlayerControls = document.querySelector('.audio-player__controls')
    let pin = document.querySelector('.audio-player__slider--pin')
    let slider = document.querySelector('.audio-player__slider')
    audioProgress = document.querySelector('.audio-player__slider--progress')

    audio = document.querySelector('audio')

    addSrc(name, size, buffer, audio, 'loadeddata')

    audioPlayerControls.onclick = playPause
    audio.onended = playPause
    audio.ontimeupdate = updateProgressBarAudio


    slider.onmousedown = function (event) {

        event.preventDefault();

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        let shiftX = event.clientX - pin.getBoundingClientRect().left;

        function onMouseMove(event) {

            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

            if (newLeft < 0) {
                newLeft = 0;
            }
            // let rightEdge = slider.offsetWidth - pin.offsetWidth;
            let rightEdge = slider.offsetWidth
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            let percentage = ((100 / rightEdge) * newLeft).toFixed(2)

            audioProgress.style.width = percentage + '%';
            audioProgress.style.transition = 'none'

            audio.currentTime = (audio.duration * percentage) / 100

            updateTimeTrack(audio.currentTime)
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }
}

function createPreviewText(name, size, buffer) {
    let el = document.createElement('div')
    el.classList.add('preview__text')
    preview__item.append(el)
    el.innerHTML = textTemplate()
    let txt = document.querySelector('iframe')

    addSrc(name, size, buffer, txt, 'load')
}

function createPreviewVideo(name, size, buffer) {

    preview__item.innerHTML = videoTemplate()

    let video = document.querySelector('video')

    addSrc(name, size, buffer, video, 'loadeddata')
}

function createPreview(name, type, size, buffer) {

    switch (type) {
        case 'image/png': case 'image/jpeg': case 'image/gif': {
            createPreviewImage(name, size, buffer)
            break
        }
        case 'audio/mp4': case 'audio/mpeg': {
            createPreviewAudio(name, size, buffer)
            break
        }
        case 'text/plain': case 'application/pdf': {
            createPreviewText(name, size, buffer)
            console.log('text');
            break
        }
        case 'video/mp4': {
            createPreviewVideo(name, size, buffer)
            break
        }
    }
}

function receivingFiles({ name, type, buffer, chunkSize, size }) {

    sum += chunkSize
    let p = Math.trunc((sum * 100) / size)

    if (p > percent && p <= 100) {
        percent = p
        // console.log(p);

        progressNumber.innerText = `${percent}`
        drawCircle('#efefef', options.lineWidth, 100 / 100);
        drawCircle('#3c97f9', options.lineWidth, percent / 100);
    }

    arrBuffer.push(new Blob([buffer]))

    if (chunkSize > buffer.byteLength) {
        createPreview(name, type, size, new Blob(arrBuffer.flat()))
        // createDownload(name, type, new Blob(arrBuffer.flat()))
        fileDownloaded = true
    }
}

document.addEventListener("DOMContentLoaded", socket.emit('page-loaded'));

filelist__action.onclick = () => {
    if (!fileDownloaded) {
        download()
    }
}
transfer__button.onclick = download
preview__button.onclick = download
panel__close.onclick = closePanel


socket.on('send-chunk', arg => {
    receivingFiles(arg)
})

socket.on('progress-bar', () => {
    addLoadingProgressBar()
})

socket.on('send-metadata', (arg) => {
    addDescription(arg)
})