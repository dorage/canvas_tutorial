const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};

const getRGBA = function (r = 0, g = 0, b = 0, a = -1) {
    return a >= 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};

const ctx = createCanvas(
    window.innerWidth,
    window.innerHeight - 100,
).getContext('2d');

const clock = function () {
    const now = new Date();
    ctx.save();
    {
        ctx.clearRect(0, 0, 300, 300);
        ctx.translate(150, 150);
        ctx.rotate(-Math.PI / 2);
        ctx.strokeStyle = getRGBA();
        ctx.fillStyle = getRGBA(100, 0, 0);
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        // hour marks
        ctx.save();
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(100, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.restore();

        // minute marks
        ctx.save();
        ctx.lineWidth = 2;
        for (let i = 0; i < 60; i++) {
            if (i % 5) {
                ctx.beginPath();
                ctx.moveTo(100, 0);
                ctx.lineTo(110, 0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI / 30);
        }
        ctx.restore();

        const sec = now.getSeconds();
        const min = now.getMinutes();
        const hr = now.getHours() > 12 ? now.getHours - 12 : now.getHours();

        ctx.fill = getRGBA();
        ctx.lineWidth = 8;

        // write seconds
        ctx.save();
        ctx.lineWidth = 4;
        ctx.strokeStyle = getRGBA(255, 0);
        {
            ctx.rotate(1.5 * Math.PI + (sec * Math.PI) / 30);
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(0, 80);
            ctx.stroke();
        }
        ctx.restore();
        // write minutes
        ctx.save();
        ctx.strokeStyle = getRGBA(0, 0, 255);
        {
            ctx.rotate(1.5 * Math.PI + (min * Math.PI) / 30);
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(0, 80);
            ctx.stroke();
        }
        ctx.restore();
        // write hours
        ctx.save();
        ctx.strokeStyle = getRGBA(100, 0, 100);
        {
            ctx.rotate(
                1.5 * Math.PI + (hr * Math.PI) / 6 + (min * Math.PI) / 360,
            );
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(0, 50);
            ctx.stroke();
        }
        ctx.restore();

        // cetral pivot
        ctx.save();
        ctx.lineWidth = 8;
        {
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
            ctx.stroke();
        }
        ctx.restore();

        // clock border
        ctx.save();
        ctx.lineWidth = 8;
        {
            ctx.beginPath();
            ctx.arc(0, 0, 140, 0, Math.PI * 2, true);
            ctx.stroke();
        }
        ctx.restore();
    }
    ctx.restore();

    window.requestAnimationFrame(clock);
};

window.requestAnimationFrame(clock);
