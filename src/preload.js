const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        invoke: (channel, data) => {
            return ipcRenderer.invoke(channel, data);
        }
    }
});
