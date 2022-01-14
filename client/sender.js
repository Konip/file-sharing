const socket = io()
import { formatBytes } from './utils.js'

const input = document.querySelector('input[type=file]')
const uploader = document.querySelector('.uploader__files')
const transfer = document.querySelector('.transfer__contents')
const url = document.querySelector('.transfer-link__url')
// const transfer__button = document.querySelector('.transfer__button')
const panel = document.querySelector('.panel')
const get__link = document.querySelector('.get__link')
const copy__link = document.querySelector('.copy__link')
const displayName__body = document.querySelector('.displayName__body')
const fileSystemTitle = document.querySelector('.file-system-entry__title')
const fileSystemSize = document.querySelector('.file-system-entry__size')
const fileSystemFormat = document.querySelector('.file-system-entry__format')
const metadataSize = document.querySelector('.metadata-size')
const panel__close = document.querySelector('.panel__close')

let transferLink = ''



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
    // panel.style.display = 'block'
}

function closePanel() {
    panel.classList.remove('panel--visible')
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

    var chunkCounter = 0

    const chunkSize = 10000
    var numberofChunks = Math.ceil(file.size / chunkSize);

    // console.log(numberofChunks);

    while (numberofChunks--) {
        console.log(file);
console.log(type);
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

    const reader = new FileReader();

    reader.readAsArrayBuffer(file)
    reader.onload = function (evnt) {

        const { name, size, type } = file

        let link = createLink()
        console.log(link);
        get__link.removeAttribute("disabled")
        get__link.style.display = 'none'
        copy__link.style.display = 'flex'
        openPanel()
        addDescription(name, size, type)

        socket.on('send-file', () => {
            console.log('send')
            sendFile(file)
        })

        socket.on('request-metadata', () => {
            sendMetadata(name, size, type)
        })
    }
}

function copyLink(link) {
    console.log(link);

    navigator.clipboard
        .writeText(`${link}`)
        .then(() => {

        })
        .catch(() => {

        });
}

input.addEventListener('change', () => {

    let file = input.files[0]
    console.log(file);
    fileUpload(file)
});

uploader.addEventListener('dragover', () => {
    console.log('drag');
})

uploader.addEventListener('dragleave', () => {
    console.log('leave');
})

uploader.addEventListener('drop', (event) => {
    event.preventDefault()
    console.log('drop');

    let file = event.dataTransfer.files[0]

    fileUpload(file)
})

copy__link.onclick = () => {
    copyLink(transferLink)
}

panel__close.onclick = closePanel