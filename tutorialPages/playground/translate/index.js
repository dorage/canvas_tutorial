const getRGBA = function (r = 0, g = 0, b = 0, a = -1) {
    return a >= 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};

/**
 * entitiy
 * 프로퍼티에 draw 함수가 있어야한다.
 *
 */
const Rectangle = function () {
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.toRight = true;
};
Rectangle.prototype.update = function (callback) {
    this.draw = callback;
};
const rect = new Rectangle();
rect.update(function (ctx, deltaTime, canvasW, canvasH) {
    ctx.fillStyle = getRGBA();
    // 방향전환
    if (this.x < 0) {
        this.toRight = true;
    } else if (this.x + this.w > canvasW) {
        this.toRight = false;
    }
    this.x += this.toRight ? deltaTime : -deltaTime;
    ctx.fillRect(this.x, 100, this.w, this.h);
});

/**
 *  이걸 생성자함수로 만들어 인스턴스를 반환하고
 *  entities에 entity를 추가하는 방식으로 가기
 *  1. 캔버스 크기를 초기 설정하는 함수
 *  2. 엔티티를 추가하는 함수 하나 (심볼키-힙?)
 *  3. 엔티티를 삭제하는 함수 하나 (심볼키-힙?)
 *  4.
 */
const Stage = function (canvasW, canvasH) {
    if (!new.target) {
        return new Stage(canvasW, canvasH);
    }
    // 캔버스를 생성합니다.
    const createCanvas = (width, height, id = 'canvas') => {
        const canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);
        return canvas;
    };
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.canvas = createCanvas(canvasW, canvasH);
    this.ctx = this.canvas.getContext('2d');

    this.entities = [];
    this.prevTime = 0;
};
// requestAnimationFrame 실행의 시간차를 ms 단위로 구한값을 양수로 반환합니다.
Stage.prototype.getDeltaTime = function () {
    const currTime = new Date().getMilliseconds();
    let delta;
    if (currTime < this.prevTime) {
        delta = 1000 - this.prevTime + currTime;
    } else {
        delta = currTime - this.prevTime;
    }
    this.prevTime = currTime;
    return delta;
};
// 엔티티를 스테이지에 추가합니다.
Stage.prototype.addEntity = function (entity) {
    this.entities.push(entity);
};
// 스테이지를 실행시킵니다.
Stage.prototype.run = function () {
    const draw = () => {
        const deltaTime = this.getDeltaTime();
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        this.entities.forEach((obj) => {
            this.ctx.save();
            console.log(this.canvasW, this.canvasH);
            if (obj) obj.draw(this.ctx, deltaTime, this.canvasW, this.canvasH);
            this.ctx.restore();
        });
        window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
};
Stage.prototype.print2 = function () {
    console.log('bye');
};

const stage = new Stage(window.innerWidth, window.innerHeight);
stage.addEntity(rect);
stage.run();
