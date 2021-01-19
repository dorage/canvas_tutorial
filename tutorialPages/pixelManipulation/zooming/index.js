const createCanvas = (width, height, id = 'canvas') => {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    document.body.appendChild(canvas);
    return canvas;
};

const getRGBA = function (r = 255, g = 0, b = 0, a = -1) {
    return a >= 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};

const canvas = createCanvas(500, 500);
const canvas2 = createCanvas(500, 500, 'smooth');
const canvas3 = createCanvas(500, 500, 'pixel');
const ctx = canvas.getContext('2d');
const smoothZoomCtx = canvas2.getContext('2d');
const pixeledZoomCtx = canvas3.getContext('2d');

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './rhino.png';
img.onload = function () {
    draw(this);
};

function draw(img) {
    ctx.drawImage(img, 10, 10);

    smoothZoomCtx.imageSmoothingEnabled = true;
    smoothZoomCtx.mozImageSmoothingEnabled = true;
    smoothZoomCtx.webkitImageSmoothingEnabled = true;
    smoothZoomCtx.msImageSmoothingEnabled = true;

    pixeledZoomCtx.imageSmoothingEnabled = false;
    pixeledZoomCtx.mozImageSmoothingEnabled = false;
    pixeledZoomCtx.webkitImageSmoothingEnabled = false;
    pixeledZoomCtx.msImageSmoothingEnabled = false;

    const zoom = function (ctx, x, y) {
        ctx.drawImage(
            canvas,
            Math.min(Math.max(0, x - 5), img.width - 10),
            Math.min(Math.max(0, y - 5), img.height - 10),
            10,
            10,
            0,
            0,
            200,
            200,
        );
    };

    canvas.addEventListener('mousemove', (event) => {
        const x = event.layerX;
        const y = event.layerY;
        zoom(smoothZoomCtx, x, y);
        zoom(pixeledZoomCtx, x, y);
    });
    document.getElementById('download').addEventListener('click', (event) => {
        const url = canvas2.toDataURL('image/png');
        const img = document.getElementById('saved');
        img.src = url;
        img.style.width = '500px';
        img.style.height = '500px';
    });
}
