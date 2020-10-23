const ipc = require('electron').ipcRenderer;

class TimerDisplay {
    constructor(displayElm, history) {
        this.history = history;
        this.displayElm = displayElm;
        this.startAudio = new Audio(path.join('.', 'assets', 'audios', 'Boom-sound.mp3'));
        this.endAudio = new Audio(path.join('.', 'assets', 'audios', 'Bell-noise.mp3'));
    }
}