import React from 'react';

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  invalid: 'lightcoral',
  selected: 'deepskyblue',
};

const NumberButton = props => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.numberStatus] }}
    onClick={() => props.onClick(props.number, props.numberStatus)}
  >
    {props.number}
  </button>
);

export default NumberButton;