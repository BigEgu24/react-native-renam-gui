// state.js
const EventEmitter = require('events');
class PathEmitter extends EventEmitter {}
const pathEmitter = new PathEmitter();

let appPath = "";

function initPathName(path) {
  if(appPath !== path) {
    appPath = path || "";
    pathEmitter.emit('pathChange', appPath); // Emit an event on path change
  }
}

function getAppPath() {
  return appPath;
}

module.exports = { initPathName, getAppPath, pathEmitter };
