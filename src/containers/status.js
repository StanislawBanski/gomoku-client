import React from "react";
import { connect } from "react-redux";
import "./status.css";

class Status extends React.Component {
  render() {
    return (
      <div className="statusParent">
        {this.props.win === null
          ? <button>Graj</button>
          : <p>Win: {this.props.win ? "white" : "black"}</p>}
      </div>
    );
  }
}

const mapStateToProps = ({ status }) => {
  return {
    win: status.win,
  };
};

export default connect(mapStateToProps)(Status);
