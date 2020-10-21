const path = require('path');

class Timer {

    constructor(displayElm, history) {
        this.history = history;
        this.displayElm = displayElm;
        this.startAudio = new Audio(path.join('.', 'assets', 'audios', 'Boom-sound.mp3'));
        this.endAudio = new Audio(path.join('.', 'assets', 'audios', 'Bell-noise.mp3'));
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

        var endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + this.runningData.workTime);
        this.history.addActivity({
            name: 'Work #1',
            start: new Date(),
            end: endTime
        });
    }

    startTimer(time) {
        if (this.runningData.working) {
            this.startAudio.play();
        }
        this.runningData.counter = time * 60;
        this.runningData.updateDisplayInterval = setInterval(() => {
            this.runningData.counter--;
            this.updateDisplay();
        }, 1_000);

        if (this.runningData.working && this.endAudio.duration) {
            let endAudioDuration = Math.round(this.endAudio.duration * 1000);
            this.runningData.endTimerPlayTimeout = setTimeout(() => {
                this.endAudio.play();
            }, (time * 60 * 1_000) - endAudioDuration);
        }
        this.runningData.endTimerTimeout = setTimeout(() => {
            clearInterval(this.runningData.updateDisplayInterval);
            this.switchState();
        }, time * 60 * 1_000);
        this.updateDisplay();
    }

    stop() {
        clearInterval(this.runningData.updateDisplayInterval);
        clearTimeout(this.runningData.endTimerTimeout);
        clearTimeout(this.runningData.endTimerPlayTimeout);
    }

    switchState() {
        if (this.runningData.working) {
            this.runningData.working = false;
            if (this.runningData.restCounter == 4) {
                this.runningData.restCounter = 0;
                this.startTimer(this.runningData.longRestTime);

                var endTime = new Date();
                endTime.setMinutes(endTime.getMinutes() + this.runningData.longRestTime);
                this.history.addActivity({
                    name: 'Long Rest',
                    start: new Date(),
                    end: endTime
                });
            } else {
                this.runningData.restCounter++;
                this.startTimer(this.runningData.restTime);

                var endTime = new Date();
                endTime.setMinutes(endTime.getMinutes() + this.runningData.restTime);
                this.history.addActivity({
                    name: 'Rest #' + this.runningData.restCounter,
                    start: new Date(),
                    end: endTime
                });
            }
        } else {
            this.runningData.working = true;
            this.startTimer(this.runningData.workTime);

            var endTime = new Date();
            endTime.setMinutes(endTime.getMinutes() + this.runningData.workTime);
            this.history.addActivity({
                name: ('Work #' + (this.runningData.restCounter + 1)),
                start: new Date(),
                end: endTime
            });
        }
    }

    updateDisplay() {
        let minutes = Math.floor(this.runningData.counter / 60);
        let seconds = (this.runningData.counter % 60);
        this.displayElm.innerHTML = (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
}