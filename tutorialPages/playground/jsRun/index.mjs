import { Stage } from './stage.mjs';
import { getRGBA } from './util.mjs';

const Rect = function (x = 0, y = 0, w = 100, h = 100) {
    if (!new.target) {
        return new Rect(x, y, w, h);
    }
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.strokeStyle = getRGBA();
    this.fillStyle = getRGBA(
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
    );
};
Rect.prototype.draw = function (ctx, deltaTime, canvasW, canvasH) {
    this.update && this.update(ctx, deltaTime, canvasW, canvasH);
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = this.strokeStyle;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
};

const sky = new Rect(0, 0, window.innerWidth, window.innerHeight);
sky.strokeStyle = getRGBA(0, 0, 0, 0);
sky.fillStyle = getRGBA(167, 213, 242);
const ground = new Rect(0, 500, window.innerWidth, window.innerHeight);
ground.strokeStyle = getRGBA(0, 0, 0, 0);
ground.fillStyle = getRGBA(153, 132, 121);
const cloudL = new Rect(0, 150, 100, 100);
const cloudM = new Rect(100, 100, 100, 150);
const cloudR = new Rect(200, 200, 100, 50);
cloudL.strokeStyle = getRGBA(0, 0, 0, 0);
cloudL.fillStyle = getRGBA(255, 255, 255);
cloudM.strokeStyle = getRGBA(0, 0, 0, 0);
cloudM.fillStyle = getRGBA(255, 255, 255);
cloudR.strokeStyle = getRGBA(0, 0, 0, 0);
cloudR.fillStyle = getRGBA(255, 255, 255);
const clouds = Array(5)
    .fill(0)
    .map(() => {
        const cloud = new Rect(window.innerWidth, 100, 200, 200);
        cloud.fillStyle = getRGBA(255, 255, 255);
        cloud.strokeStyle = getRGBA(255, 255, 255);
        return cloud;
    });

const rect1 = new Rect(100, 300, 100, 200);
const rect2 = new Rect(1700, 100);

rect1.update = function (ctx, deltaTime, canvasW, canvasH) {
    // 방향전환
    if (this.x < 0) {
        this.toRight = true;
    } else if (this.x + this.w > canvasW) {
        this.toRight = false;
    }
    // 충돌
    if (
        !this.toRight &&
        this.x < rect2.x + rect2.w &&
        this.x + this.w > rect2.x + rect2.w
    ) {
        console.log('rect1 collision left');
        this.toRight = true;
        rect2.toRight = false;
    } else if (this.toRight && this.x + this.w > rect2.x && this.x < rect2.x) {
        console.log('rect1 collision right');
        this.toRight = false;
        rect2.toRight = true;
    }
    this.x += this.toRight ? deltaTime / 2 : -deltaTime / 2;
};
rect2.update = function (ctx, deltaTime, canvasW, canvasH) {
    // 방향전환
    if (this.x < 0) {
        this.toRight = true;
    } else if (this.x + this.w > canvasW) {
        this.toRight = false;
    }
    // 충돌
    if (
        !this.toRight &&
        this.x < rect1.x + rect1.w &&
        this.x + this.w > rect1.x + rect1.w
    ) {
        console.log('rect2 collision left');
        this.toRight = true;
        rect1.toRight = false;
    } else if (this.toRight && this.x + this.w > rect1.x && this.x < rect1.x) {
        console.log('rect2 collision right');
        this.toRight = false;
        rect1.toRight = true;
    }
    this.x += this.toRight ? deltaTime / 2 : -deltaTime / 2;
};

const stage = new Stage(window.innerWidth, window.innerHeight - 100);
stage.addEntity(sky);
stage.addEntity(cloudL);
stage.addEntity(cloudM);
stage.addEntity(cloudR);
stage.addEntity(ground);
stage.addEntity(rect1);
stage.addEntity(rect2);
stage.run();
