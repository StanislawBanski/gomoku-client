import React from "react";
import "./slider.css";

const slider = props => {
  return (
    <p className="slider">
      <input
        type="range"
        name={props.name}
        min={props.min}
        max={props.max}
        value={props.value}
        onchange={props.onChange}
        disabled={props.disabled}
      />
      <span> {props.value} </span>
    </p>
  );
};

export default slider;
