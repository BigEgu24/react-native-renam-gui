import React from "react";

const TitlebarButton = ({ message, children }) => (
  <button
    onClick={() => {
      window.electron.ipcRenderer.sendMessage(message, [message]);
    }}
    style={{ marginRight: 7, backgroundColor: "transparent", borderColor: 'transparent', cursor: "inherit" }}
  >
    {children}
  </button>
);

export default TitlebarButton;
