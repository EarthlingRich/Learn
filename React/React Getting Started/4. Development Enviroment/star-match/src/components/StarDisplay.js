
import React from 'react';
import utils from '../math-utils';

const StarDisplay = props => (
  <>
    {utils.range(1, props.count).map(number => (
      <div key={number} className="star" />
    ))}
  </>
);

export default StarDisplay;