import React from 'react';
import { connect } from 'react-redux';
import { startGame, resetGame } from './../redux/status';
import { makeFirstMove } from './../redux/board';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  startGame(event) {
    this.props.startGame();
    this.props.makeFirstMove();
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
          {this.props.draw
            ? <p>Draw</p>
            : <p>Next move: {this.props.move ? 'white' : 'black'}</p>}
          <p>Turns: {this.props.turn}</p>
          <p>Stones placed: {this.props.filled}</p>
          {this.props.computer1
            ? <div>
                <p>
                  Black last response time:
                  {' '}
                  {(this.props.time_1 / 1000).toFixed(2)}
                  s
                </p>
                <p>
                  Black avg response time:
                  {' '}
                  {(this.props.avg_time_1 / 1000).toFixed(2)}
                  s
                </p>
              </div>
            : <div />}
          {this.props.computer2
            ? <div>
                <p>
                  White last response time:
                  {' '}
                  {(this.props.time_2 / 1000).toFixed(2)}
                  s
                </p>
                <p>
                  White avg response time:
                  {' '}
                  {(this.props.avg_time_2 / 1000).toFixed(2)}
                  s
                </p>
              </div>
            : <div />}
          <button onClick={this.resetGame}>Reset game</button>
        </div>
      );
    } else if (this.props.in_progress) {
      result = (
        <div>
          <p>Won: {this.props.win ? 'white' : 'black'}</p>
          <p>Turns: {this.props.turn}</p>
          <p>Stones placed: {this.props.filled}</p>
          {this.props.computer1
            ? <div>
                <p>
                  Black last response time:
                  {' '}
                  {(this.props.time_1 / 1000).toFixed(2)}
                  s
                </p>
                <p>
                  Black avg response time:
                  {' '}
                  {(this.props.avg_time_1 / 1000).toFixed(2)}
                  s
                </p>
              </div>
            : <div />}
          {this.props.computer2
            ? <div>
                <p>
                  White last response time:
                  {' '}
                  {(this.props.time_2 / 1000).toFixed(2)}
                  s
                </p>
                <p>
                  White avg response time:
                  {' '}
                  {(this.props.avg_time_2 / 1000).toFixed(2)}
                  s
                </p>
              </div>
            : <div />}
          <button onClick={this.resetGame}>Reset game</button>
        </div>
      );
    }
    return result;
  }
}

const mapStateToProps = ({ status, settings }) => {
  return {
    win: status.win,
    in_progress: status.in_progress,
    turn: status.turn,
    filled: status.filled,
    move: status.move,
    draw: status.draw,
    time_1: status.time_1,
    time_2: status.time_2,
    avg_time_1: status.avg_time_1,
    avg_time_2: status.avg_time_2,
    computer1: settings[1].computer,
    computer2: settings[2].computer,
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
    makeFirstMove() {
      dispatch(makeFirstMove());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
