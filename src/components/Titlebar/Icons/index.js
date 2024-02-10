import React, { useState } from "react";
import { MacClose, MacMinimize, MacMaximize } from "./Mac"; // Adjust the path accordingly
import { WinClose, WinMinimize, WinMaximize } from "./Windows"; // Adjust the path accordingly
import TitlebarButton from "../TitlebarButton";

export default function Icons() {
  // const isMacOS = window.electron.isMac;
  const isMacOS = true;
  const [onHover, setOnHover] = useState(true);
  return (
    <div
      style={{ width: "calc(23px*3)", appRegion: "no-drag" }}
      onMouseEnter={() => {
        setOnHover(!onHover);
      }}
      onMouseLeave={() => {
        setOnHover(!onHover);
      }}
    >
      {isMacOS ? (
        <>
          <TitlebarButton message="closeApp">
            <MacClose onHover={onHover} />
          </TitlebarButton>
          <TitlebarButton message="minimizeApp">
            <MacMinimize onHover={onHover} />
          </TitlebarButton>
          <TitlebarButton message="maximizeApp">
            <MacMaximize onHover={onHover} />
          </TitlebarButton>
        </>
      ) : (
        <>
          <TitlebarButton message="minimizeApp">
            <WinMinimize />
          </TitlebarButton>
          <TitlebarButton message="closeApp">
            <WinClose />
          </TitlebarButton>
          <TitlebarButton message="maximizeApp">
            <WinMaximize />
          </TitlebarButton>
        </>
      )}
    </div>
  );
}
