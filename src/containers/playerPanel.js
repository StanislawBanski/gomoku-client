import React from "react";
import { connect } from "react-redux";
import "./playerPanel.css";
import { setComputer, setAI, setDepth, setAlgorithm } from "./../redux/settings";
import Dropdown from "../components/dropdown";
import Slider from "../components/slider";

class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAI: 0
    };

    this.algorithmChange = this.algorithmChange.bind(this);
    this.depthChange = this.depthChange.bind(this);
    this.computerChange = this.computerChange.bind(this);
    this.computerPlayerChange = this.computerPlayerChange.bind(this);
  }
  
  computerChange(event) {
    this.props.setComputer(this.props.player, event.target.checked);
  }

  depthChange(event){
    this.props.setDepth(this.props.player, event.target.value);
  }

  algorithmChange(event){
    this.props.setAlgorithm(this.props.player, event.target.value);
  }

  computerPlayerChange(event) {
    this.setState({
      selectedAI: event.target.value
    });
    this.props.setAI(this.props.player, event.target.value);
  }

  AIoptions() {
    return [
      { value: 0, text: "Wybierz sztuczną inteligencje" },
      { value: 1, text: "AI heurystyka 1" },
      { value: 2, text: "AI heurystyka 2" },
      { value: 3, text: "AI heurystyka 3" },
      { value: 4, text: "AI heurystyka 4" },
      { value: 5, text: "AI heurystyka 5" }
    ];
  }

  AIalgorithms() {
    return [
      { value: 0, text: "Wybierz algorytm" },
      { value: 1, text: "Min-Max" },
      { value: 2, text: "Alpha-Beta" },
    ];
  }

  render() {
    return (
      <div className="panel">
        <h2>{this.props.color}</h2>
        <div>
          <p>
            <input
              type="checkbox"
              name={`computer_${this.props.player}`}
              id={`computer_${this.props.player}`}
              checked={this.props.settings[this.props.player].computer}
              disabled={this.props.in_progress}
              onChange={this.computerChange}
            />
            <label htmlFor={`computer_${this.props.player}`}>Komputer</label>
          </p>
        </div>
        <div>
          <div>
            <label htmlFor={`selectedAI_${this.props.player}`}>
              Wybrany algorytm:
            </label>
            <Dropdown
              name="AIalg"
              label="Select_Alg"
              data={this.AIalgorithms()}
              value="0"
              onChange={this.computerPlayerChange}
              disabled={
                this.props.in_progress ||
                  !this.props.settings[this.props.player].computer
              }
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor={`selectedAI_${this.props.player}`}>
              Wybrana Heurystyka:
            </label>
            <Dropdown
              name="AIS"
              label="Select_AI"
              data={this.AIoptions()}
              value="0"
              onChange={this.computerPlayerChange}
              disabled={
                this.props.in_progress ||
                  !this.props.settings[this.props.player].computer
              }
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor={`depth_${this.props.player}`}>
              Głębokość algorytmu
            </label>
            <Slider
              name="AIdepth"
              value="25"
              min="0"
              max="100"
              onChange={this.depthChange}
              disabled={
                this.props.in_progress ||
                  !this.props.settings[this.props.player].computer
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setComputer(player, value) {
      dispatch(setComputer(player, value));
    },
    setAI(player, value) {
      dispatch(setAI(player, value));
    },
    setDepth(player, value) {
      dispatch(setDepth(player, value));
    },
    setAlgorithm(player, value) {
      dispatch(setAlgorithm(player, value));
    }
  };
};

const mapStateToProps = ({ status, settings }) => {
  return {
    in_progress: status.in_progress,
    settings
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
