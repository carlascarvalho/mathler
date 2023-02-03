import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const Statistics: React.FC = () => {
  return (
    <MenuButton icon={faChartSimple}>
      <h1>Statistics</h1>
      <div className={styles.statistics}>
        <div className={styles.info}>
          <div className={styles.value}>999</div>
          <div className={styles.description}>Played</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>999</div>
          <div className={styles.description}>Win %</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>999</div>
          <div className={styles.description}>Current Streak</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>999</div>
          <div className={styles.description}>Max Streak</div>
        </div>
      </div>
      <h1>Guess Distribution</h1>
      <div className={styles.distribution}>
        <div className={styles.guess}>
          <div className={styles.index}>1</div>
          <div className={styles['bar-background']}>
            <div className={styles.bar}>0</div>
          </div>
        </div>
        <div className={styles.guess}>
          <div className={styles.index}>2</div>
          <div className={styles['bar-background']}>
            <div className={styles.bar}>1</div>
          </div>
        </div>
      </div>
    </MenuButton>
  );
};

export default Statistics;
