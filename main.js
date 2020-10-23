//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents');
const path = require('path');
const { Timer } = require('./src/timer');
const { app, ipcMain, BrowserWindow, Tray, Menu } = require('electron');
const { time } = require('console');

if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}



let timer = new Timer();

function createWindow() {
    const win = new BrowserWindow({
        width: 512,
        height: 512,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        titleBarStyle: 'customButtonsOnHover',
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join('.', 'assets', 'icons', 'win', 'icon.ico')
    });
    timer.addWindow(win);

    win.loadFile('index.html');

    const tray = new Tray(path.join('.', 'assets', 'icons', 'win', 'icon.ico'))

    const contextMenu = Menu.buildFromTemplate([{ label: 'Activities', type: 'normal' }, { label: 'Timer', type: 'normal' }])
    tray.setToolTip('TODO Pomodoro')
    tray.setContextMenu(contextMenu)
    win.webContents.openDevTools()
}

ipcMain.on('timer-start', (evnt, arg) => {
    console.log(typeof arg);
    time.start();
});

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})