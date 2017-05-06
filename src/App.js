import React, { Component } from "react";
import Panel from "./containers/panel";
import Board from "./containers/board";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p><b>Gomoku web client</b></p> 
        <Panel />              
        <Board />
      </div>
    );
  }
}

export default App;
