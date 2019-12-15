import React from 'react';

const PlayAgain = props => (
  <div className="game-done">
    <div
      className="message"
      style={{ color: props.gameStatus === 'won' ? 'green' : 'red' }}
    >
      {props.gameStatus === 'won' ? 'You won! :)' : 'You lost. :('}
    </div>
    <button onClick={props.onClick}>Play again</button>
  </div>
);

export default PlayAgain;