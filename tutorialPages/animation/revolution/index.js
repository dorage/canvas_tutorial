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

createCanvas(window.innerWidth, window.innerHeight - 100).getContext('2d');

const sun = new Image();
const moon = new Image();
const earth = new Image();

const draw = function () {
    const ctx = document.getElementById('canvas').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

    ctx.fillStyle = getRGBA(0, 0, 0, 0.4);
    ctx.strokeStyle = getRGBA(0, 153, 255, 0.4);
    ctx.save();
    ctx.translate(150, 150);

    // Earth
    const time = new Date();
    ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
            ((2 * Math.PI) / 60000) * time.getMilliseconds(),
    );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // shadow
    ctx.drawImage(earth, -12, -12);

    // Moon
    ctx.save();
    ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
            ((2 * Math.PI) / 6000) * time.getMilliseconds(),
    );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
};

const init = function () {
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

    window.requestAnimationFrame(draw);
};

init();
