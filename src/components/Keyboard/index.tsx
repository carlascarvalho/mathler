import { useEffect } from 'react';
import { useGame } from '../../contexts/game';
import styles from './index.module.css';

const Keyboard: React.FC = () => {
  const [gameState, { onKeyPress }] = useGame();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      onKeyPress(e.key);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyPress]);

  const numberKeys: Keys = {};
  const operatorKeys: Keys = {};
  Object.keys(gameState.keys).forEach((element) => {
    const isNumber = !isNaN(Number(element));

    if (isNumber) {
      numberKeys[element] = gameState.keys[element];
    } else {
      operatorKeys[element] = gameState.keys[element];
    }
  });

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
