import React, { useState, useEffect } from 'react';
import utils from '../math-utils';

import StarDisplay from './StarDisplay';
import NumberButton from './NumberButton';
import PlayAgain from './PlayAgain';

const MAX_STARS = 9;
const START_SECONDS = 10;

const useGameState = () => {
  const [starCount, setStarCount] = useState(utils.random(1, MAX_STARS));
  const [availableNumbers, setAvailableNumbers] = useState(
    utils.range(1, MAX_STARS)
  );
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(START_SECONDS);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (remainingSeconds === START_SECONDS && timerId === null) {
      setTimerId(
        setInterval(() => {
          setRemainingSeconds(remainingSeconds => remainingSeconds - 1);
          if (remainingSeconds === 0) {
            clearInterval(timerId);
          }
        }, 1000)
      );
    }
    if (remainingSeconds === 0) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [remainingSeconds, timerId]);

  const gameStatus =
    availableNumbers.length === 0
      ? 'won'
      : remainingSeconds === 0
        ? 'lost'
        : 'active';

  const setGameState = (number, numberStatus) => {
    const newSelectedNumbers =
      numberStatus === 'available'
        ? selectedNumbers.concat(number)
        : selectedNumbers.filter(n => n !== number);

    if (utils.sum(newSelectedNumbers) !== starCount) {
      setSelectedNumbers(newSelectedNumbers);
    } else {
      const newAvailableNumber = availableNumbers.filter(
        n => !newSelectedNumbers.includes(n)
      );
      setAvailableNumbers(newAvailableNumber);
      setSelectedNumbers([]);
      setStarCount(utils.randomSumIn(newAvailableNumber, MAX_STARS));
    }
  };

  return {
    starCount,
    availableNumbers,
    selectedNumbers,
    remainingSeconds,
    gameStatus,
    setGameState,
  };
};

const Game = props => {
  const {
    starCount,
    availableNumbers,
    selectedNumbers,
    remainingSeconds,
    setGameState,
    gameStatus,
  } = useGameState();

  const numberStatus = number => {
    const isSelectionInvalid = utils.sum(selectedNumbers) > starCount;
    if (!availableNumbers.includes(number)) {
      return 'used';
    }
    if (selectedNumbers.includes(number)) {
      return isSelectionInvalid ? 'invalid' : 'selected';
    }
    return 'available';
  };

  const onNumberClick = (number, numberStatus) => {
    if (gameStatus !== 'active' || numberStatus == 'used') {
      return;
    }

    setGameState(number, numberStatus);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarDisplay count={starCount} />
          )}
        </div>
        <div className="right">
          {utils.range(1, MAX_STARS).map(number => (
            <NumberButton
              key={number}
              number={number}
              numberStatus={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {remainingSeconds}</div>
    </div>
  );
};

export default Game;