function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let timerId = null;

startBtnEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
});

stopBtnEl.addEventListener('click', () => {
    clearInterval(timerId);
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
});