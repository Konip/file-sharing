const socket = io()

const input = document.querySelector('input[type=file]')
const uploader = document.querySelector('.uploader__files')
const transfer = document.querySelector('.transfer__body')
const url = document.querySelector('.transfer-link__url')

function createLink() {
    console.log(transfer);
    console.log(uploader);

    let link = window.btoa(+new Date).slice(-7, -2)

    uploader.remove()
    transfer.appendChild('value',)

    url.setAttribute()
    return link
}

function sendLink(link) {
    socket.emit('link', link)
}

function sendFile(file) {

    console.log(file);
    const reader = new FileReader();

    reader.readAsArrayBuffer(file)
    reader.onload = function (evnt) {

        const { name, type, size } = file

        var chunkCounter = 0

        const chunkSize = 10000
        var numberofChunks = Math.ceil(file.size / chunkSize);

        // console.log(numberofChunks);

        while (numberofChunks--) {
            console.log(file);

            let chunk = new Blob([file]).slice(chunkCounter, chunkCounter + chunkSize)

            socket.emit('fs', {
                name,
                type,
                size,
                chunkSize,
                'buffer': chunk
            })

            chunkCounter += chunkSize
        }
    }
}

input.addEventListener('change', () => {
  
    let file = input.files[0]
    let link = createLink()
    sendLink(link)
    console.log(link);
    // sendFile(file)
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
    sendFile(file)
})