const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};

const ctx = createCanvas(
    window.innerWidth,
    window.innerHeight - 100,
).getContext('2d');

function getRGBA(r = 255, g = 255, b = 255, a = -1) {
    return a >= 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}

function draw(ctx, time) {
    ctx.fillStyle = getRGBA(255, 221, 0);
    ctx.fillRect(0, 0, 150, 37.5);
    ctx.fillStyle = getRGBA(102, 204, 0);
    ctx.fillRect(0, 37.5, 150, 37.5);
    ctx.fillStyle = getRGBA(0, 153, 255);
    ctx.fillRect(0, 75, 150, 37.5);
    ctx.fillStyle = getRGBA(255, 51, 0);
    ctx.fillRect(0, 112.5, 150, 37.5);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 4; j++) {
            ctx.fillStyle = getRGBA(255, 255, 255, ((i + time + j) % 10) / 10);
            ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
        }
    }
}

function update(callback, i = 0, fps = 30) {
    callback(i);
    i = ++i >= 60 ? 0 : i;
    console.log('update');
    setTimeout(() => update(callback, i, fps), 1000 / fps);
}

update((time) => draw(ctx, time), 0, 10);
