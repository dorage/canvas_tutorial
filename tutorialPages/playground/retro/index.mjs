const $window = document.getElementById('window');
$window.ondragstart = function () {
    return false;
};
const headers = document.getElementsByClassName('header_title');
let clicked = false;

for (const $header of headers) {
    $header.onmousedown = function (event) {
        let shiftX = event.clientX - $window.getBoundingClientRect().left;
        let shiftY = event.clientY - $window.getBoundingClientRect().top;

        $window.classList.add('moving');
        $window.style.zIndex = 1000;

        document.body.append($window);

        function moveAt(pageX, pageY) {
            $window.style.left = pageX - shiftX + 'px';
            $window.style.top = pageY - shiftY + 'px';
        }

        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        $window.onmouseup = function () {
            clicked = false;
            document.removeEventListener('mousemove', onMouseMove);
            $window.classList.remove('moving');
        };
    };
}

console.log('running');
