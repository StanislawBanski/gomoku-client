import React from "react";
import PlayerPanel from "./playerPanel";
import SwitchPlayer from "./switchPlayer";
import Status from "./status";
import PreviewSwitch from './previewSwitch';
import "./panel.css";

export default class Panel extends React.Component {
  render() {
    return (
      <div className="panelParent">
        <Status />            
        <PlayerPanel player="1" color="Czarny" />       
        <PlayerPanel player="2" color="Biały" />
        <SwitchPlayer />
        <PreviewSwitch />
      </div>
    );
  }
}
