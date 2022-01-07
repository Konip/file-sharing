const socket = io()

function createDownload(fileName, type, content) {
    let blob = new Blob([content], { type: type });
    let link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click()
    URL.revokeObjectURL(link.href);
}

let arrBuffer = []

socket.on('fs-send', arg => {
    console.log(arg);

    const { name, type, buffer, chunkSize } = arg
    arrBuffer.push(new Blob([buffer]))

    // createDownload(name, type, buffer)

    if (chunkSize > buffer.byteLength) {
        createDownload(name, type, new Blob(arrBuffer.flat()))
    }

})

