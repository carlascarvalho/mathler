import { useEffect, useState } from 'react';
import styles from './index.module.css';

type Props = {
  onKeyPress: (value: string) => void;
};

const Keyboard: React.FC<Props> = ({ onKeyPress }) => {
  const [numberKeys] = useState([
    { value: '0', status: '' },
    { value: '1', status: '' },
    { value: '2', status: '' },
    { value: '3', status: '' },
    { value: '4', status: '' },
    { value: '5', status: '' },
    { value: '6', status: '' },
    { value: '7', status: '' },
    { value: '8', status: '' },
    { value: '9', status: '' },
  ]);

  const [operatorKeys] = useState([
    { value: '+', status: '' },
    { value: '-', status: '' },
    { value: '*', status: '' },
    { value: '/', status: '' },
  ]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      onKeyPress(e.key);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyPress]);

  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>
        {numberKeys.map(({ value, status }) => (
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
        {operatorKeys.map(({ value, status }) => (
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
