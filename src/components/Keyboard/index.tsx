import { useEffect, useState } from 'react';
import { useGame } from '../../contexts/game';
import styles from './index.module.css';

type Keys = { [key: string]: { status: string } };

const Keyboard: React.FC = () => {
  const [gameState, { onKeyPress }] = useGame();

  const [numberKeys, setNumberKeys] = useState<Keys>({
    '0': { status: '' },
    '1': { status: '' },
    '2': { status: '' },
    '3': { status: '' },
    '4': { status: '' },
    '5': { status: '' },
    '6': { status: '' },
    '7': { status: '' },
    '8': { status: '' },
    '9': { status: '' },
  });

  const [operatorKeys, setOperatorKeys] = useState<Keys>({
    '+': { status: '' },
    '-': { status: '' },
    '*': { status: '' },
    '/': { status: '' },
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      onKeyPress(e.key);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyPress]);

  useEffect(() => {
    const currentGuessIndex = gameState.guesses.findIndex(
      (guess) => !guess.submitted
    );

    if (currentGuessIndex <= 0) {
      return;
    }

    const lastGuess = gameState.guesses[currentGuessIndex - 1].value;

    const updatedNumberKeys = JSON.parse(JSON.stringify(numberKeys));
    const updatedOperatorKeys = JSON.parse(JSON.stringify(operatorKeys));

    lastGuess.split('').forEach((element, index) => {
      const isNumber = !isNaN(Number(element));

      const currentKeyMap = isNumber ? updatedNumberKeys : updatedOperatorKeys;
      const currentKey = currentKeyMap[element];

      if (currentKey.status === 'correct') {
        return;
      }

      if (element === gameState.solution.equation[index]) {
        currentKey.status = 'correct';
        return;
      }

      if (gameState.solution.equation.includes(element)) {
        currentKey.status = 'present';
        return;
      }

      if (currentKey.status !== '') {
        return;
      }

      currentKey.status = 'absent';
    });

    setNumberKeys(updatedNumberKeys);
    setOperatorKeys(updatedOperatorKeys);
  }, [gameState.guesses, gameState.solution.equation]);

  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>
        {Object.entries(numberKeys).map(([value, { status }]) => (
          <button
            key={value}
            className={styles[status]}
            onClick={() => onKeyPress(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.row}>
        <button key='enter' onClick={() => onKeyPress('Enter')}>
          Enter
        </button>
        {Object.entries(operatorKeys).map(([value, { status }]) => (
          <button
            key={value}
            className={styles[status]}
            onClick={() => onKeyPress(value)}
          >
            {value}
          </button>
        ))}
        <button key='del' onClick={() => onKeyPress('Backspace')}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
