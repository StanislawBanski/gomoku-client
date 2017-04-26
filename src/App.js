import React, { Component } from 'react';
import Panel from './containers/panel';
import Status from './containers/status';
import Board from './containers/board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Panel />
        <Status />
        <Board />
      </div>
    );
  }
}

export default App;
