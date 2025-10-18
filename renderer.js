const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveJSON: (data) => ipcRenderer.send('save-json', data)
});
