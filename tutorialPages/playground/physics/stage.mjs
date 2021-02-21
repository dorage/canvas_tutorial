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
        let canvas = document.getElementById(id);
        if (!canvas) {
            canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
        }
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        canvas.style.border = '1px solid black';
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
            if (obj) obj.draw(this.ctx, deltaTime, this.canvasW, this.canvasH);
            this.ctx.restore();
        });
        window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
};

export { Stage };
