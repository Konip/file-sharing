const canvas = document.querySelector('canvas')

export const options = {
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

export function drawCircle(color, lineWidth, percent) {

    percent = Math.min(Math.max(0, percent || 1), 1);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'; // butt, round or square
    ctx.lineWidth = lineWidth
    ctx.stroke();
};

drawCircle('#efefef', options.lineWidth, 100 / 100);
drawCircle('#3c97f9', options.lineWidth, options.percent / 100);