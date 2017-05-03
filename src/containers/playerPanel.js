import React from "react";
import "./playerPanel.css";

export default class PlayerPanel extends React.Component {
  render() {
    return (
      <div className="panel">
        <h2>{this.props.color}</h2>
        <p>
          <input
            type="checkbox"
            name={`computer_${this.props.player}`}
            id={`computer_${this.props.player}`}
          />
          <label htmlFor={`computer_${this.props.player}`}>Computer</label>
        </p>
        <p>
          <label htmlFor={`url_${this.props.player}`}>Adres</label>
          <input
            type="text"
            name={`url_${this.props.player}`}
            id={`url_${this.props.player}`}
          />
        </p>
        <p>
          <label htmlFor={`params_${this.props.player}`}>Parametry</label>
          <textarea
            rows="8"
            name={`params_${this.props.player}`}
            id={`params_${this.props.player}`}
          />
        </p>
      </div>
    );
  }
}
