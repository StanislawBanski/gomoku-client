import React from "react";
import PlayerPanel from "./playerPanel";
import SwitchPlayer from "./switchPlayer";
import Status from "./status";
import "./panel.css";

export default class Panel extends React.Component {
  render() {
    return (
      <div className="panelParent">            
        <PlayerPanel player="1" color="Czarny" />       
        <PlayerPanel player="2" color="Biały" />
        <SwitchPlayer />
        <Status />
      </div>
    );
  }
}
