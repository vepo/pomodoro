class History {
    constructor(historyPanelElm) {
        this.historyPanelElm = historyPanelElm;
        this.addChild(this.createEmptyElement());

    }

    addActivity(activity) {
        let emtpyElm = this.historyPanelElm.querySelector('.history .empty');
        if (emtpyElm) {
            emtpyElm.parentNode.removeChild(emtpyElm);
        }

        let activityElm = document.createElement('div');
        activityElm.classList.add('entry');
        let typeElm = document.createElement('span');
        typeElm.innerHTML = activity.name;
        activityElm.appendChild(typeElm);
        let startElm = document.createElement('span');
        startElm.classList.add('time');
        startElm.innerHTML = activity.start.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit"
        });
        activityElm.appendChild(startElm);
        let endElm = document.createElement('span');
        endElm.classList.add('time');
        endElm.innerHTML = activity.end.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit"
        });
        activityElm.appendChild(endElm);
        this.addChild(activityElm);
    }

    createEmptyElement() {
        let emtpyElm = document.createElement('div');
        emtpyElm.classList.add('entry');
        emtpyElm.classList.add('empty');
        let typeElm = document.createElement('span');
        typeElm.innerHTML = "Not Started";
        emtpyElm.appendChild(typeElm);
        let startElm = document.createElement('span');
        startElm.classList.add('time');
        startElm.innerHTML = "N/A";
        emtpyElm.appendChild(startElm);
        let endElm = document.createElement('span');
        endElm.classList.add('time');
        endElm.innerHTML = "N/A";
        emtpyElm.appendChild(endElm);
        return emtpyElm;
    }

    addChild(row) {
        this.historyPanelElm.querySelector('.history').appendChild(row);
    }
}