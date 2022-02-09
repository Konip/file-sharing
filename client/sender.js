const socket = io()
import { drawCircle, options } from './utils/progressBar.js'
import { tooltip } from './utils/template.js'
import { TypeWriter } from './utils/typeWriter.js'
import { formatBytes } from './utils/utils.js'

const input = document.querySelector('input[type=file]')
const uploader = document.querySelector('.uploader__files')
const uploaderСontent = document.querySelector('.uploader__files-content')
const transfer = document.querySelector('.transfer__contents')
const transfer__container = document.querySelector('.transfer__container')
const url = document.querySelector('.transfer-link__url')
const panel = document.querySelector('.panel')
const get__link = document.querySelector('.get__link')
const copy__link = document.querySelector('.copy__link')
const transfer__buttonAlt = document.querySelector('.transfer__button--alt')
const displayName__body = document.querySelector('.displayName__body')
const fileSystemTitle = document.querySelector('.file-system-entry__title')
const fileSystemSize = document.querySelector('.file-system-entry__size')
const fileSystemFormat = document.querySelector('.file-system-entry__format')
const metadataSize = document.querySelector('.metadata-size')
const panel__close = document.querySelector('.panel__close')
const complete__text = document.querySelector('.complete__text a')
const progress = document.getElementById('progress')
const progressNumber = document.querySelector('.progress-number')
const transfer__body = document.querySelector('.transfer__body')
const transfer__loaded = document.querySelector('.transfer__loaded')
const transfer__loadedText = document.querySelector('.transfer__loaded p')
const title = document.querySelector('.title-anim-word')

const reader = new FileReader();
let transferLink = ''
let percent = 0
let tooltipActive = false


function init() {
    const words = ["anything", "videos", "music", "images", "documents"]
    const wait = 6000
    new TypeWriter(title, words, wait)
}

function changeButton(type) {
    switch (type) {
        case 'onloadstart':
            get__link.style.display = 'none'
            transfer__buttonAlt.style.display = 'flex'
            break;

        case 'copy':
            copy__link.style.display = 'flex'
            transfer__buttonAlt.style.display = 'none'
            break;

        case 'cancel':
            transfer__buttonAlt.style.display = 'none'
            get__link.style.display = 'flex'
            break;

        default:
            break;
    }
}

function cancelDownloads() {
    reader.abort()
    changeButton('cancel')
    transfer__loaded.style.display = 'none'
}

function addLoadingProgressBar() {
    transfer__body.style.display = 'none'
    progress.style.display = 'flex'
    transfer__loaded.style.display = 'block'
}

function deleteProgressBar() {
    progress.style.display = 'none'
    transfer__body.style.display = 'block'
}

function showTooltip(text) {
    transfer__container.insertAdjacentHTML('beforeend', tooltip(text))
    closePanel()
    setTimeout(() => {
        const transfer__tooltip = document.querySelector('.transfer__tooltip')
        transfer__tooltip.remove()
        tooltipActive = false
    }, 5000)
}

function addDescription(name, size, type) {
    displayName__body.innerText = name
    fileSystemTitle.innerText = name
    fileSystemSize.innerText = formatBytes(size)
    fileSystemFormat.innerText = name.slice(name.lastIndexOf('.') + 1)

    metadataSize.innerText = formatBytes(size)
}

function openPanel(envt) {
    if (envt) envt.preventDefault()
    panel.classList.add('panel--visible')
    panel.style.visibility = 'visible'
}

function closePanel() {
    panel.classList.remove('panel--visible')
}

function openClose(envt) {
    if (envt) envt.preventDefault()
    if (document.querySelector('.panel--visible')) {
        closePanel()
    } else {
        openPanel()
    }
}

function sendId(id) {
    socket.emit('id', id)
}

function createLink() {

    let id = window.btoa(+new Date).slice(-7, -2)
    let link = document.URL + 't/' + id

    uploader.style.display = 'none'
    transfer.style.display = 'block'

    url.setAttribute('value', link)
    sendId(id)
    transferLink = link
    return link
}

function sendFile(file) {

    const { name, type, size } = file

    let chunkCounter = 0

    // const chunkSize = 10000
    const chunkSize = 1000000 // 1 mb
    let numberofChunks = Math.ceil(size / chunkSize);

    for (let i = 0; i < numberofChunks; i++) {

        let chunk = new Blob([file], { type: type }).slice(chunkCounter, chunkCounter + chunkSize)

        socket.emit('file-sharing', {
            name,
            type,
            size,
            chunkSize,
            'buffer': chunk
        })
        chunkCounter += chunkSize
    }
}

function sendMetadata(name, size, type) {
    socket.emit('response-metadata', ({ name, size, type }))
}

function fileUpload(file) {

    reader.readAsArrayBuffer(file)
    reader.onloadstart = () => {
        addLoadingProgressBar()
        changeButton('onloadstart')
    }

    reader.onprogress = function (evnt) {
        const { loaded, total } = evnt
        percent = Math.trunc((loaded * 100) / total)

        progressNumber.innerText = `${percent}`
        transfer__loadedText.innerText = `${formatBytes(loaded)} of ${formatBytes(total)} uploaded`

        drawCircle('#efefef', options.lineWidth, 100 / 100);
        drawCircle('#3c97f9', options.lineWidth, percent / 100);
    }

    reader.onload = function (evnt) {

        const { name, size, type } = file

        let link = createLink()

        changeButton('copy')
        openPanel()
        addDescription(name, size, type)

        socket.on('send-file', () => {
            sendFile(file)
        })

        socket.on('request-metadata', () => {
            sendMetadata(name, size, type)
        })
    }
    reader.onloadend = () => {
        transfer__loaded.style.display = 'none'
        deleteProgressBar()
    }
    reader.onerror = function (evnt) {
        console.log(evnt.currentTarget.error.message);
        showTooltip('Limit is exceeded. Maximum file size 2 GB')
    }
}

function copyLink(link) {
    url.focus()
    url.select()
    navigator.clipboard
        .writeText(`${link}`)
        .then(() => {
            if (!tooltipActive) {
                showTooltip('This link has been copied to your clipboard')
                tooltipActive = true
            }
        })
        .catch(() => { });
}

document.addEventListener('DOMContentLoaded', init)

input.addEventListener('change', () => {
    let file = input.files[0]
    fileUpload(file)
});

uploader.addEventListener('dragover', () => {
    uploaderСontent.style.borderColor = '#409fff'
})

uploader.addEventListener('dragleave', () => {
    uploaderСontent.style.borderColor = '#d9dcde'
})

uploader.addEventListener('drop', (event) => {
    event.preventDefault()
    let file = event.dataTransfer.files[0]
    fileUpload(file)
    uploaderСontent.style.borderColor = '#d9dcde'
})

copy__link.onclick = () => copyLink(transferLink)
url.onclick = () => copyLink(transferLink)
transfer__buttonAlt.onclick = cancelDownloads
complete__text.onclick = openClose
panel__close.onclick = closePanel