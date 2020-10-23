const { ipcRenderer } = require('electron')

class Display {
    constructor(timer, btnStartElm) {
        let status = true;
        btnStartElm.addEventListener('click', () => {
            if (status) {
                ipcRenderer.send('timer-start', { x: 'asdad' });
                //timer.start();
                status = false;
                btnStartElm.innerHTML = 'Stop';
            } else {
                ipcRenderer.send('timer-stop', 'asdad');
                //timer.stop();
                status = true;
                btnStartElm.innerHTML = 'Start';
            }
        });
    }
}