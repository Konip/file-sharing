const socket = io()
import { drawCircle, options } from './progressBar.js'
import { audioTemplate } from './template.js'
import { formatBytes } from './utils.js'

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

let arrBuffer = []
let sum = 0
let percent = 0
let contentLoaded = false


function createDownload(fileName, type, content) {
    let blob = new Blob([content], { type: type });
    let link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click()
    URL.revokeObjectURL(link.href);
}

function addProgressBar() {
    transfer__container.style.display = 'none'
    progress.style.display = 'flex'
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

function addSrc(name, size, buffer, element) {
    element.src = URL.createObjectURL(buffer)
    console.log(buffer);
    element.onload = function () {
        URL.revokeObjectURL(element.src)
        deleteProgressBar()
        preview__title.innerText = name
        preview__subtitle.innerText = formatBytes(size)
    }
}

function createPreview(name, type, size, buffer) {

    switch (type) {
        case 'image/png': case 'image/jpeg': case 'image/gif': {

            let el = document.createElement('div')
            el.classList.add('preview__image')
            preview__item.append(el)
            let img = document.createElement('img')
            el.append(img)
            addSrc(name, size, buffer, img)
            break
        }
        case 'audio/mp4': case 'audio/mpeg': {

            let el = document.createElement('div')
            el.classList.add('preview__audio')
            preview__item.append(el)
            el.innerHTML = audioTemplate()
            addSrc(name, size, buffer, el)


            break
        }
    }

    // img.src = URL.createObjectURL(buffer)
    // console.log(buffer);
    // img.onload = function () {
    //     URL.revokeObjectURL(img.src)
    //     progress.style.display = 'none'
    //     transfer__container.style.display = 'block'
    //     preview__title.innerText = name
    //     preview__subtitle.innerText = formatBytes(size)
    // }
}



function receivingFiles({ name, type, buffer, chunkSize, size }) {

    sum += chunkSize
    let p = Math.trunc((sum * 100) / size)

    if (p > percent && p <= 100) {
        percent = p
        console.log(p);

        progressNumber.innerText = `${percent}`
        drawCircle('#efefef', options.lineWidth, 100 / 100);
        drawCircle('#3c97f9', options.lineWidth, percent / 100);
    }

    arrBuffer.push(new Blob([buffer]))

    if (chunkSize > buffer.byteLength) {
        createPreview(name, type, size, new Blob(arrBuffer.flat()))
        // createDownload(name, type, new Blob(arrBuffer.flat()))
        contentLoaded = true
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    socket.emit('page-loaded')
});

filelist__action.onclick = () => {
    if (!contentLoaded) {
        download()
    }
    openPanel()
}

transfer__button.onclick = download
preview__button.onclick = download
panel__close.onclick = closePanel


socket.on('send-chunk', arg => {
    // console.log(arg);
    receivingFiles(arg)
})

socket.on('progress-bar', () => {
    addProgressBar()
})

socket.on('send-metadata', (arg) => {
    addDescription(arg)
})