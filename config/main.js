const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
require("@electron/remote/main").initialize();

let mainWindow; // Declare mainWindow here

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 961,
    height: 825,
    autoHideMenuBar: true,
    resizable: false, // Prevent resizing
    maximizable: false, // Prevent maximizing
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL("http://localhost:8000");
}
app.on("ready", function () {
  // Handle IPC request to set the global path
  ipcMain.on('log-message', (event, message) => {
    // Assuming `mainWindow` is your BrowserWindow instance
    mainWindow?.webContents.send('log-message', message);
  });
  ipcMain.handle("open-directory-dialog", async (event) => {
    const window = BrowserWindow.getFocusedWindow();
    const result = await dialog.showOpenDialog(window, {
      properties: ["openDirectory"],
    });
    if (result.canceled) {
      return;
    } else {
      const selectedPath = result.filePaths[0]; // Assuming single selection
      
      return selectedPath;
    }
  });
  ipcMain.on("minimizeApp", () => {
    mainWindow?.minimize();
  });
  ipcMain.on("maximizeApp", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on("closeApp", () => {
    mainWindow?.close();
  });
  createWindow();
});

app.on("window-all-close", function () {
  if (process.platform === "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
