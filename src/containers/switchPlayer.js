import React from "react";
import { connect } from "react-redux";
import "./switchPlayer.css";
import { switchPlayers } from "./../redux/settings";

class SwitchPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch() {
    this.props.switchPlayers();
  }

  render() {
    return (
      <button
        className="switch"
        onClick={this.handleSwitch}
        disabled={this.props.in_progress}
      >
        Switch
      </button>
    );
  }
}

const mapStateToProps = ({ status }) => {
  return {
    in_progress: status.in_progress,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchPlayers() {
      dispatch(switchPlayers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchPlayer);
