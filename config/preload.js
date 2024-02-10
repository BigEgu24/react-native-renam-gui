const { app, contextBridge, ipcRenderer } = require("electron");
// const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { isMac, isWindows } = require("./detect-platform");
const { UpdateMyProject } = require("./functions/ReactNativeRename");

contextBridge.exposeInMainWorld("electron", {
  isMac, // Get OS Type
  isWindows, // Get OS Type
  ipcRenderer: {
    sendMessage(channel, args) {
      ipcRenderer.send(channel, args);
    },
  },
  send: (channel, data) => {
    let validChannels = ['toMain']; // Channels from renderer to main
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['log-message']; // Channels from main to renderer
    if (validChannels.includes(channel)) {
      // Using a named function to allow for removal later
      const listener = (event, ...args) => func(...args);
      ipcRenderer.on(channel, listener);

      return () => ipcRenderer.removeListener(channel, listener); // Return a cleanup function
    }
  },
  openDirectoryDialog: () => ipcRenderer.invoke("open-directory-dialog"),
  getSelectedPath: () => ipcRenderer.invoke("get-selected-path"),
  ProjectRenamerTwo: async (props) => {
    try {
      UpdateMyProject({
        newAppName: props.newAppName,
        newDisplayName: props.newDisplayName,
        newBundleID: props.newBundleID,
        path: props.path,
      }).catch((err) => console.error(err));
    } catch (err) {
      return err;
    }
  },
});
