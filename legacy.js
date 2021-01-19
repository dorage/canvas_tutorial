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

function getRGBA(r = 255, g = 0, b = 0, a = -1) {
    return a >= 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}
function Box(x = 200, y = 200, width = 100, height = 100) {
    if (!new.target) {
        return new Box(...arguments);
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Box.prototype.draw = function (ctx) {
    console.log('heloo');
    ctx.fillStyle = getRGBA(255, 0, 0);
    ctx.fillRect(this.x, this.y, this.x + this.width, this.y + this.height);
};

const drawStack = [];
const box = new Box();

drawStack.push(box);

const onGrid = (ctx) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const girdSize = 50;
    ctx.strokeStyle = getRGBA(230, 230, 230);
    for (let i = 0; i < window.innerWidth / girdSize; i++) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(girdSize * i, 0);
        ctx.lineTo(girdSize * i, height);
        ctx.stroke();
    }
    for (let j = 0; j < window.innerHeight / girdSize; j++) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, girdSize * j);
        ctx.lineTo(width, girdSize * j);
        ctx.stroke();
    }
};

function drawGuage(ctx, time) {
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
    const lineCap = ['butt', 'round', 'square'];
    for (let i = 0; i < 10; i++) {
        ctx.lineWidth = 1 + i;
        ctx.lineCap = lineCap[i % 3];
        ctx.beginPath();
        ctx.moveTo(5 + i * 14, 150);
        ctx.lineTo(5 + i * 14, 285);
        ctx.stroke();
    }
}

function draw(ctx, time) {
    ctx.fillRect(0, 0, 150, 150);
    ctx.save();

    ctx.fillStyle = '#09F';
    ctx.fillRect(15, 15, 120, 120);
    ctx.save();

    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30, 30, 90, 90);

    ctx.restore();
    ctx.fillRect(45, 45, 60, 60);

    ctx.restore();
    ctx.fillRect(60, 60, 30, 30);

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            ctx.save();
            ctx.rotate((Math.PI / 180) * time * 3);
            ctx.fillStyle = 'rgb(' + 51 * i + ', ' + (255 - 51 * i) + ', 255)';
            ctx.translate(10 + j * 50, 10 + i * 50);
            ctx.fillRect(80, 80, 25, 25);
            ctx.restore();
        }
    }
}

function update(callback, i = 0, fps = 30) {
    callback(i);
    i = ++i >= 60 ? 0 : i;
    console.log('update');
    setTimeout(() => update(callback, i, fps), 1000 / fps);
}

update(
    (time) => {
        onGrid(ctx);
        draw(ctx, time);
        drawStack.forEach((elem) => elem.draw(ctx));
    },
    0,
    10,
);