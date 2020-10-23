const { webFrame } = require('electron');
const path = require('path');

window.onload = () => {
    let history = new History(document.getElementById('history-holder'));
    let timer = new TimerDisplay(document.getElementById('timer-display'), history);
    let display = new Display(timer, document.getElementById('timer-start-button'));
};
