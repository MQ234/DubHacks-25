const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let nextProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Start Next.js development server
  startNextServer(win);
}

function startNextServer(win) {
  const nextPath = path.join(__dirname, 'study-group-site');
  
  // Start Next.js dev server
  nextProcess = spawn('npm', ['run', 'dev'], {
    cwd: nextPath,
    stdio: 'pipe'
  });

  nextProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log('Next.js:', output);
    
    // Check if server is ready
    if (output.includes('Local:') || output.includes('ready')) {
      // Load the Next.js app in Electron window
      win.loadURL('http://localhost:3000');
    }
  });

  nextProcess.stderr.on('data', (data) => {
    console.error('Next.js Error:', data.toString());
  });

  // Fallback: try to load after 3 seconds
  setTimeout(() => {
    win.loadURL('http://localhost:3000');
  }, 3000);
}

app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (nextProcess) {
    nextProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Listen for the event to save JSON
ipcMain.on('save-json', (event, jsonData) => {
  const savePath = path.join(app.getPath('documents'), 'StudyData.json');
  fs.writeFileSync(savePath, JSON.stringify(jsonData, null, 2));
  console.log('Saved JSON to', savePath);
});
