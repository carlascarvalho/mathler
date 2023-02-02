import { useEffect, useState } from 'react';
import { useGame } from '../../contexts/game';
import styles from './index.module.css';

const Alert: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [gameState, { setAlert }] = useGame();

  useEffect(() => {
    if (!gameState.alert) {
      setOpen(false);
      return;
    }

    setOpen(true);

    const alertTimeOut = setTimeout(() => setAlert(''), 2000);

    return () => clearTimeout(alertTimeOut);
  }, [gameState.alert, setAlert]);

  if (!open) {
    return null;
  }

  return <div className={styles.alert}>{gameState.alert}</div>;
};

export default Alert;
