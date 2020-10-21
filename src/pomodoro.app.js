window.onload = () => {
    let timer = new Timer(document.getElementById('timer-display'));
    let display = new Display(timer, document.getElementById('timer-start-button'));
};
