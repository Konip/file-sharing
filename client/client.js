const socket = io()

const input = document.querySelector('input[type=file]')

// Math.random().toString(36).slice(-8)
input.addEventListener('change', () => {
    let file = input.files[0]
    console.log(file);
    const reader = new FileReader();

    reader.readAsArrayBuffer(input.files[0])
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
});