const socket = io()
import { drawCircle, options } from './progressBar.js'

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
const img = document.querySelector('.preview__item--image img')


function createDownload(fileName, type, content) {
    let blob = new Blob([content], { type: type });
    let link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click()
    URL.revokeObjectURL(link.href);
}

function progressBar() {
    transfer__container.style.display = 'none'
    progress.style.display = 'flex'
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

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function addDescription({ name, size, type }) {

    fileSystemTitle.innerText = name
    fileSystemSize.innerText = formatBytes(size)
    fileSystemFormat.innerText = name.slice(name.lastIndexOf('.') + 1)
}

function createPreview(i) {
  img.src = URL.createObjectURL(i)
  img.onload = function() {
    URL.revokeObjectURL(img.src) // free memory
  }
}

let arrBuffer = []
let sum = 0
let percent = 0

function receivingFiles({ name, type, buffer, chunkSize, size }) {

    sum += chunkSize
    let p = Math.trunc((sum * 100) / size)

    if (p > percent) {
        percent = p
        console.log(p);

        progressNumber.innerText = `${percent}`
        drawCircle('#efefef', options.lineWidth, 100 / 100);
        drawCircle('#3c97f9', options.lineWidth, percent / 100);
    }

    arrBuffer.push(new Blob([buffer]))
   
    if (chunkSize > buffer.byteLength) {
        createPreview(new Blob(arrBuffer.flat()))
        // createDownload(name, type, new Blob(arrBuffer.flat()))
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    socket.emit('page-loaded')
});

filelist__action.onclick = () => {
    download()
    openPanel()
}

transfer__button.onclick = download
panel__close.onclick = closePanel


socket.on('send-chunk', arg => {
    // console.log(arg);
    receivingFiles(arg)
})

socket.on('progress-bar', () => {
    progressBar()
})

socket.on('send-metadata', (arg) => {
    addDescription(arg)
})