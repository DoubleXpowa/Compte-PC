const { contextBridge, ipcRenderer } = require('electron');

// Expose uniquement les APIs nécessaires à l'app (pas d'accès Node complet)
contextBridge.exposeInMainWorld('electronAPI', {
  getVersion:      ()    => ipcRenderer.invoke('app-version'),
  checkUpdate:     ()    => ipcRenderer.invoke('check-update'),
  installUpdate:   ()    => ipcRenderer.invoke('install-update'),
  showSaveDialog:  (opts)=> ipcRenderer.invoke('show-save-dialog', opts),
  showOpenDialog:  (opts)=> ipcRenderer.invoke('show-open-dialog', opts),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available',  cb),
  onUpdateDownloaded:(cb) => ipcRenderer.on('update-downloaded', cb),
});
