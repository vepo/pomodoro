# Architecture

This is an ElectronJS Desktop Application. All the documentation can be found on [ElectronJS API](https://www.electronjs.org/docs);

This application will have:

* **MAIN Process** - The Background process
* **Display Window** - A Display window to control the Timer and show the activity history
* **Tray** - The Tray Controller to control the timer and access the application functionalities
* **Task Window** - A Task Management window.

## Communication priciples

All elements should communication with the MAIN Process using IPC. A message can be synchronous or asynchronous, depending from the functionality. If the emmiter requires a response from the listener, that means that the message should be synchronous.

It must exists one channel for each message type.

For main process:
```javascript
// In main process.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

For other renderer:

```javascript
// In renderer process (web page).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

# Channels

| Channel | Description | Message |
|---------|-------------|---------|
| timer-start | It should be generated when the Timer start | `{ time: new Date() }` |

## Timer Start

```sequence
Display Window->MAIN Process: Timer started at 10:00 AM
```