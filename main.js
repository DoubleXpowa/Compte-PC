const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); }

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width:  1100,
    height: 720,
    minWidth:  800,
    minHeight: 560,
    icon: path.join(__dirname, 'icons', 'icon.ico'),
    title: 'Mon Compte',
    backgroundColor: '#0A0F1C',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color:        '#111827',
      symbolColor:  '#94A3B8',
      height:       36,
    },
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (process.platform !== 'darwin') app.quit(); // ← fix
  });
}

function setupUpdater() {
  if (!app.isPackaged) return;
  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('update-available');
  });
  autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update-downloaded');
  });
}

ipcMain.handle('app-version', () => app.getVersion());
ipcMain.handle('check-update', () => {
  if (app.isPackaged) autoUpdater.checkForUpdates();
});
ipcMain.handle('install-update', () => {
  autoUpdater.quitAndInstall();
});
ipcMain.handle('show-save-dialog', async (_, opts) => {
  return dialog.showSaveDialog(mainWindow, opts);
});
ipcMain.handle('show-open-dialog', async (_, opts) => {
  return dialog.showOpenDialog(mainWindow, opts);
});

app.whenReady().then(() => {
  createWindow();
  setupUpdater();
  app.on('activate', () => { if (!mainWindow) createWindow(); });
});

app.on('window-all-closed', () => {
  app.quit(); // ← force toujours la fermeture complète
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});
