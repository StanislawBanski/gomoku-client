import React from "react";
import "./cross.css";

export default function Cross(props) {
  return (
    <button
      className={`cross cross--${props.color} cross--${props.id}`}
      disabled={props.color}
      onClick={e => props.click(props.id, e)}
    />
  );
}
