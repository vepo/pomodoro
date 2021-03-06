const { webFrame } = require('electron');

window.onload = () => {
    let history = new History(document.getElementById('history-holder'));
    let timer = new Timer(document.getElementById('timer-display'), history);
    let display = new Display(timer, document.getElementById('timer-start-button'));

    let dragging = false;
    let btnMove = document.getElementById('btn-move');
    btnMove.addEventListener('click', evnt => {
        document.body.classList.toggle('dragging');
        dragging = !dragging;
    });

    document.body.addEventListener('mouseout', evnt => {
        if (dragging && evnt.target == document.getElementById('backgroud-image')) {
            document.body.classList.toggle('dragging');
            dragging = !dragging;
        }
    });

    document.body.addEventListener('mouseleave', evnt => {
        if (dragging) {
            document.body.classList.toggle('dragging');
            dragging = !dragging;
        }
    });

    document.body.addEventListener('mousemove', evnt => {
        if (dragging) {
            webFrame.context.moveBy(evnt.movementX, evnt.movementY);
        }
    });
};
