const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};

const getRGBA = function (r = 255, g = 0, b = 0, a = -1) {
    return a >= 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};

const canvas = createCanvas(window.innerWidth, window.innerHeight - 100);
const ctx = canvas.getContext('2d');

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './rhino.png';
img.onload = function () {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
};
const hoveredColor = document.getElementById('hovered-color');
const selectedColor = document.getElementById('selected-color');

function pick(event, destination) {
    const x = event.layerX;
    const y = event.layerY;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const [red, blue, green, alpha] = pixel.data;

    const rgba = getRGBA(red, blue, green, alpha / 255);
    console.log(rgba);
    destination.style.background = rgba;
    destination.textContent = rgba;

    return rgba;
}

canvas.addEventListener('mousemove', function (event) {
    pick(event, hoveredColor);
});
canvas.addEventListener('click', function (event) {
    pick(event, selectedColor);
});
