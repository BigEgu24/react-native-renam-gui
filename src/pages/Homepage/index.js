import React, { useEffect, useState } from "react";
import Input from "../../Input";
import LogList from "../../components/LogList";
import { setJsonCookie, getJsonCookie } from "../../components/Cookies"; // Ensure the path to cookies.js is correct

export default function Homepage() {
  // Attempt to get stored values from cookies, or use "" as a fallback
  const storedValues = getJsonCookie("appData") || {
    newAppName: "",
    newDisplayName: "",
    newBundleID: "",
    newAppPath: "",
  };
  // State hooks for form inputs, initialized with values from cookies or defaults
  const [newAppName, setNewAppName] = useState(storedValues.newAppName);
  const [newDisplayName, setNewDisplayName] = useState(
    storedValues.newDisplayName
  );
  const [newBundleID, setNewBundleID] = useState(storedValues.newBundleID);
  const [newAppPath, setNewAppPath] = useState(storedValues.newAppPath);
  const [messages, setMessages] = useState([]);

  const renameProjectTwo = async (props) => {
    try {
      setMessages([]);
      const appJSON = {
        newAppName,
        newDisplayName,
        newBundleID,
        path: newAppPath,
      };
      // Call the function to set cookie here, assuming you have one like setJsonCookie()
      setJsonCookie("appData", appJSON);
      window.electron.ProjectRenamerTwo(appJSON);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectFolder = async () => {
    try {
      setNewAppPath("");
      const filePaths = await window.electron.openDirectoryDialog();
      console.log(filePaths);
      if (filePaths && filePaths.length > 0) {
        setNewAppPath(filePaths);
      }
    } catch (error) {
      console.error("Failed to open directory dialog:", error);
    }
  };

  // Define styles
  const wrapperStyle = {
    padding: "20px", // Outer padding for the wrapper
    width: "800px", // Maximum width of the wrapper
    margin: "0 auto", // Center the wrapper
    backgroundColor: "#f9f9f9", // Light background color for the wrapper
    borderRadius: "8px", // Rounded corners for the wrapper
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow for depth
  };

  // Inline styles for inputs and button
  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const pathStyle = {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "1px solid #ddd",
    fontFamily: "Monospace",
    fontSize: "16px",
    display: "inline-block",
    maxWidth: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
  };

  const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    margin: "5px 5px 0px 0px",
  };

  return (
    <div style={{ paddingTop: 45 }}>
      <div style={wrapperStyle}>
        <div>
          <input
            type="text"
            placeholder="New App Name (AmazingApp)"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="New Display Name (My Amazing App)"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="New Bundle ID (com.company.amazingapp)"
            value={newBundleID}
            onChange={(e) => setNewBundleID(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <button onClick={handleSelectFolder} style={buttonStyle}>
            Select Folder
          </button>
          <button onClick={renameProjectTwo} style={buttonStyle}>
            Rename Project
          </button>
        </div>
        <div>{newAppPath && <p style={pathStyle}>{newAppPath}</p>}</div>
        <LogList messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}
