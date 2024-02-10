const {chalk} = require("./chalk")
let ipcRenderer;
try {
  ipcRenderer = require("electron").ipcRenderer;
} catch (error) {
  // We're not in a renderer process or Electron is not available
  console.log("no electron");
}

const log = (...args) => {
  // Combine all arguments into a string, handling custom formatting
  const message = args
    .map((arg) => {
      if (typeof arg === "function") {
        // If the argument is a function (from your custom chalk implementation),
        // call it with an empty string to get the formatted result.
        return arg("");
      }
      // For other types, just convert to string in the most straightforward manner
      return String(arg);
    })
    .join(" ");

  if (ipcRenderer) {
    // In renderer process, send message to main process
    ipcRenderer.send("log-message", message);
  } else {
    // In main process or non-Electron environment, log directly
    console.log(message);
  }
};

const errLog = (message) => {
  // Log the error message using the same logic as `log`
  log(chalk.red(message));

  // Additionally, throw an error to stop execution
  throw new Error(message);
};

module.exports = { log, errLog };
