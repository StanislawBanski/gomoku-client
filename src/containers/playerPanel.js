import React from "react";
import { connect } from "react-redux";
import "./playerPanel.css";
import { setComputer, setAddress, setParams } from "./../redux/settings";

class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.computerChange = this.computerChange.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.paramsChange = this.paramsChange.bind(this);
  }

  computerChange(event) {
    this.props.setComputer(this.props.player, event.target.checked);
  }

  addressChange(event) {
    this.props.setAddress(this.props.player, event.target.value);
  }

  paramsChange(event) {
    this.props.setParams(this.props.player, event.target.value);
  }

  render() {
    return (
      <div className="panel">
        <h2>{this.props.color}</h2>
        <p>
          <input
            type="checkbox"
            name={`computer_${this.props.player}`}
            id={`computer_${this.props.player}`}
            checked={this.props.settings[this.props.player].computer}
            disabled={this.props.in_progress}
            onChange={this.computerChange}
          />
          <label htmlFor={`computer_${this.props.player}`}>Computer</label>
        </p>
        <p>
          <label htmlFor={`url_${this.props.player}`}>Address</label>
          <input
            type="text"
            name={`url_${this.props.player}`}
            id={`url_${this.props.player}`}
            value={this.props.settings[this.props.player].address}
            disabled={
              this.props.in_progress ||
                !this.props.settings[this.props.player].computer
            }
            onChange={this.addressChange}
          />
        </p>
        <p>
          <label htmlFor={`params_${this.props.player}`}>Params</label>
          <textarea
            rows="8"
            name={`params_${this.props.player}`}
            id={`params_${this.props.player}`}
            value={this.props.settings[this.props.player].params}
            disabled={
              this.props.in_progress ||
                !this.props.settings[this.props.player].computer
            }
            onChange={this.paramsChange}
          />
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setComputer(player, value) {
      dispatch(setComputer(player, value));
    },
    setAddress(player, address) {
      dispatch(setAddress(player, address));
    },
    setParams(player, params) {
      dispatch(setParams(player, params));
    },
  };
};

const mapStateToProps = ({ status, settings }) => {
  return {
    in_progress: status.in_progress,
    settings,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
