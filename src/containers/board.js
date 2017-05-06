import React from "react";
import { connect } from "react-redux";
import Cross from "./../components/cross";
import { makeMove } from "./../redux/board";
import "./board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.crossClick = this.crossClick.bind(this);
  }

  crossClick(id, event) {
    this.props.makeMove(id, this.props.move);
  }

  render() {
    const crosses = this.props.board.map((element, id) => (
      <Cross
        key={id}
        id={id}
        color={element != null ? element ? "white" : "black" : ""}
        click={this.crossClick}
      />
    ));

    return <div className="board">{this.props.preview && crosses}</div>;
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    move: state.status.move,
    preview: state.settings.preview || !(state.settings[1].computer && state.settings[2].computer),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeMove: (id, value) => dispatch(makeMove(id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
