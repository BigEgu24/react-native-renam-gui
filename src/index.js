import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./components/Router/index.js";
import { routes } from "./Routes.js";
import "./App.scss";
import Titlebar from "./components/Titlebar/index.js";

const AppWrapper = () => {
  return (
    <div style={{ width: "100%" }}>
      <Titlebar />
      <Router routes={routes} />
    </div>
  );
};

// ReactDOM.render(<AppWrapper />, document.getElementById("root"));
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppWrapper />);
