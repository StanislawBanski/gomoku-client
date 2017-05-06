import React from 'react';
import { connect } from 'react-redux';
import { startGame, resetGame } from './../redux/status';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  startGame(event) {
    this.props.startGame();
  }

  resetGame(event) {
    this.props.resetGame();
  }

  render() {
    let result = (
      <div><button onClick={this.startGame}>Start game</button></div>
    );
    if (this.props.in_progress && this.props.win === null) {
      result = (
        <div>
          <p>Next move: {this.props.move ? 'white' : 'black'}</p>
          <p>Turns: {this.props.turn}</p>
          <p>Stones placed: {this.props.filled}</p>
          <button onClick={this.resetGame}>Reset game</button>
        </div>
      );
    } else if (this.props.in_progress) {
      result = (
        <div>
          <p>Won: {this.props.win ? 'white' : 'black'}</p>
          <p>Turns: {this.props.turn}</p>
          <p>Stones placed: {this.props.filled}</p>
          <button onClick={this.resetGame}>Reset game</button>
        </div>
      );
    }
    return result;
  }
}

const mapStateToProps = ({ status }) => {
  return {
    win: status.win,
    in_progress: status.in_progress,
    turn: status.turn,
    filled: status.filled,
    move: status.move,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame() {
      dispatch(startGame());
    },
    resetGame() {
      dispatch(resetGame());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
