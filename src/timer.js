class Timer {

    constructor(displayElm) {
        this.displayElm = displayElm;
        this.runningData = {
            working: true,
            restCounter: 0,
            workTime: 25,
            restTime: 5,
            longRestTime: 10
        };

    }

    start() {
        this.startTimer(this.runningData.workTime);
    }

    startTimer(time) {
        this.runningData.counter = time * 60;
        this.runningData.updateDisplayInterval = setInterval(() => {
            this.runningData.counter--;
            this.updateDisplay();
        }, 1_000);
        this.runningData.endTimerTimeout = setTimeout(() => {
            clearInterval(this.runningData.updateDisplayInterval);
            this.switchState();
        }, time * 60 * 1_000);
        this.updateDisplay();
    }

    stop() {
        clearInterval(this.runningData.updateDisplayInterval);
        clearTimeout(this.runningData.endTimerTimeout);
    }

    switchState() {
        if (this.runningData.working) {
            this.runningData.working = false;
            if (this.runningData.restCounter == 4) {
                this.runningData.restCounter = 0;
                this.startTimer(this.runningData.longRestTime);
            } else {
                this.runningData.restCounter++;
                this.startTimer(this.runningData.restTime);
            }
        } else {
            this.runningData.working = true;
            this.startTimer(this.runningData.workTime);
        }
    }

    updateDisplay() {
        let minutes = Math.floor(this.runningData.counter / 60);
        let seconds = (this.runningData.counter % 60);
        this.displayElm.innerHTML = (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
}