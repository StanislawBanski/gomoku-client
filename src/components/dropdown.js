import React from "react";
import "./dropdown.css";

const dropdown = props => {
  function renderList() {
    return props.data.map(option => (
        option.value === 0 ? (
            <option key={option.value} value={option.value} disabled>
                {option.text}
        </option> ) :
        (      
      <option key={option.value} value={option.value}>
        {option.text}
      </option>)
    ));
  }

  return (
    <p className="dropdown">
      <select
        className="select"
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        {renderList()}
      </select>
    </p>
  );
};

export default dropdown;