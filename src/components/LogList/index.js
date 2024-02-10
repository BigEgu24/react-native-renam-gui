import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const LogList = ({ messages, setMessages }) => {
  useEffect(() => {
    const cleanup = window.electron.receive("log-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      cleanup();
    };
  }, []);

  // Styles for the log list container
  const logListStyle = {
    backgroundColor: "#f0f0f0", // Light grey background
    border: "1px solid #ddd", // Light border
    borderRadius: "4px", // Rounded corners
    padding: "10px", // Padding inside the container
    height: "300px", // Maximum height before scrolling
    overflowY: "auto", // Allow vertical scrolling
    fontFamily: "Monaco, monospace", // Font style
    fontSize: "14px", // Font size
    margin: "20px 0", // Margin around the container
  };
  DOMPurify.setConfig({
    ALLOWED_TAGS: ["span"],
  });
  return (
    <div style={logListStyle}>
      {messages.map((msg, index) => {
        const cleanMSG = DOMPurify.sanitize(msg);
        return <p key={index} dangerouslySetInnerHTML={{ __html: cleanMSG }}></p>;
      })}
    </div>
  );
};

export default LogList;
