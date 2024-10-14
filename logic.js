let startTime, updatedTime, difference;
let interval;
let running = false;
const timeDisplay = document.getElementById('time');
const millisecondsDisplay = document.getElementById('milliseconds');
const laps = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(interval);
        running = false;
        difference = new Date().getTime() - startTime;
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    timeDisplay.textContent = '00:00:00';
    millisecondsDisplay.textContent = '.00';
    laps.innerHTML = '';
    difference = 0;
}

function saveLap() {
    const lapTime = timeDisplay.textContent + millisecondsDisplay.textContent;
    const lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.textContent = lapTime;
    laps.appendChild(lapElement);
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); 

    timeDisplay.textContent = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;

    millisecondsDisplay.textContent = '.' + (milliseconds < 10 ? '0' : '') + milliseconds;
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('saveLap').addEventListener('click', saveLap);