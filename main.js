// const { app, BrowserWindow, ipcMain } = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Listen for the event to save JSON
ipcMain.on('save-json', (event, jsonData) => {
  const savePath = path.join(app.getPath('documents'), 'StudyData.json');
  fs.writeFileSync(savePath, JSON.stringify(jsonData, null, 2));
});
