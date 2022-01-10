const socket = io()

const progress = document.getElementById('progress')
const canvas = document.querySelector('canvas')
const progressNumber = document.querySelector('.progress-number')
const transfer__container = document.querySelector('.transfer__container')
const panel = document.querySelector('.panel')
const fileSystemTitle = document.querySelector('.file-system-entry__title')
const fileSystemSize = document.querySelector('.file-system-entry__size')
const fileSystemFormat = document.querySelector('.file-system-entry__format')

function createDownload(fileName, type, content) {
    let blob = new Blob([content], { type: type });
    let link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click()
    URL.revokeObjectURL(link.href);
}

function progressBar(){
    transfer__container.style.display = 'none'
    progress.style.display = 'flex'
}

function download() {
    socket.emit('download')
    console.log('download');
}

function openPanel(){
    console.log('aa');
    panel.classList.add('panel--visible')
}

function addDescription(name, size, type) {
    fileSystemTitle.innerText = name
    fileSystemSize.innerText = formatBytes(size)
    fileSystemFormat.innerText = name.slice(name.lastIndexOf('.') + 1)
}

const options = {
    percent: progress.getAttribute('data-percent'),
    size: 220,
    lineWidth: 15,
    rotate: 0
}

if (typeof (G_vmlCanvasManager) !== 'undefined') {
    G_vmlCanvasManager.initElement(canvas);
}

const ctx = canvas.getContext('2d');
canvas.width = canvas.height = options.size;

ctx.translate(options.size / 2, options.size / 2); // change center
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

const radius = (options.size - options.lineWidth) / 2;

function drawCircle(color, lineWidth, percent) {

    percent = Math.min(Math.max(0, percent || 1), 1);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'; // butt, round or square
    ctx.lineWidth = lineWidth
    ctx.stroke();
};

drawCircle('#efefef', options.lineWidth, 100 / 100);
drawCircle('#555555', options.lineWidth, options.percent / 100);


let arrBuffer = []
let sum = 0
let percent = 0

socket.on('send-chunk', arg => {
    // console.log(arg);

    const { name, type, buffer, chunkSize, size } = arg

    // console.log(size);
    sum += chunkSize
    let p = Math.trunc((sum * 100) / size)

    if (p > percent) {
        percent = p
        console.log(p);

        progressNumber.innerText = `${percent}`
        drawCircle('#efefef', options.lineWidth, 100 / 100);
        drawCircle('#555555', options.lineWidth, percent / 100);
    }

    arrBuffer.push(new Blob([buffer]))

    // createDownload(name, type, buffer)

    if (chunkSize > buffer.byteLength) {
        createDownload(name, type, new Blob(arrBuffer.flat()))
    }

})

socket.on('progress-bar',()=>{
    progressBar()
})

socket.on('metadata',()=>{
    addDescription()
})