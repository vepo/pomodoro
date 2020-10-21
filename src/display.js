class Display {
    constructor(timer, btnStartElm) {
        let status = true;
        btnStartElm.addEventListener('click', () => {
            if (status) {
                timer.start();
                status = false;
                btnStartElm.innerHTML = 'Stop';
            } else {
                timer.stop();
                status = true;
                btnStartElm.innerHTML = 'Start';
            }
        });
    }
}