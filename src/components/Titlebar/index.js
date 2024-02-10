import React from "react";
import { MacClose, MacMinimize, MacMaximize } from "./Icons/Mac"; // Adjust the path accordingly
import { WinClose, WinMinimize, WinMaximize } from "./Icons/Windows"; // Adjust the path accordingly
// import Wrapper from "@universal/common/components/Wrapper";
// import TitlebarButton from "./TitlebarButton";
import Icons from "./Icons/index";

// const isMacOS = window.electron.isMac;
const isMacOS = true;

export default function Titlebar() {
  return (
    <div
      style={{
        justifyContent: "space-between",
        flexDirection: isMacOS ? "row" : "row-reverse",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
        borderBottom: "1px solid #f2f2f2",
        WebkitAppRegion: 'drag'
      }}
    >
      <Icons />
    </div>
  );
}
