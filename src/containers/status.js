import React from 'react';
import { connect } from 'react-redux';
import { startGame, resetGame } from './../redux/status';
import "./status.css";

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
      <div className="statusParent" ><button onClick={this.startGame}>Graj</button></div>
     );
    if (this.props.in_progress && this.props.win === null) {
      result = (
        <div className="statusParent">
          {this.props.draw ? <p><b>Remis</b></p> : <p><b>Następny ruch: {this.props.move ? 'białe' : 'czarne'}</b></p>}
          <p><b>Tura: {this.props.turn}</b></p>
          <button onClick={this.resetGame}>Resetuj</button>
        </div>
      );
    } else if (this.props.in_progress) {
      result = (
        <div className="statusParent">
          <p><b>Zwycięzca: {this.props.win ? 'białe' : 'czarne'}</b></p>
          <p><b>Tura: {this.props.turn}</b></p>
          <button onClick={this.resetGame}>Resetuj</button>
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
    draw: status.draw
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
