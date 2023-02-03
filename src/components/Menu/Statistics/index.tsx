import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../../../helpers/storage';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const Statistics: React.FC = () => {
  const statistics = storage.getGameStatistics();

  const getNumPlayed = () => {
    if (!statistics?.guesses) {
      return 0;
    }

    return Object.values(statistics.guesses).reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0
    ) as number;
  };

  const numPlayed = getNumPlayed();
  const numLost = statistics?.guesses?.fail || 0;
  const numWon = Math.max(0, numPlayed - numLost);

  const getWinPercentage = () => {
    if (numPlayed === 0) {
      return 0;
    }

    const percentWon = Math.round((numWon / numPlayed) * 100);

    return Math.min(percentWon, 100);
  };

  const getGuessPercentage = (value: number) => {
    if (numPlayed === 0) {
      return 0;
    }

    const percent = Math.round((value / numWon) * 100);

    return Math.min(percent, 100);
  };

  return (
    <MenuButton icon={faChartSimple}>
      <h1>Statistics</h1>
      <div className={styles.statistics}>
        <div className={styles.info}>
          <div className={styles.value}>{getNumPlayed()}</div>
          <div className={styles.description}>Played</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>{getWinPercentage()}</div>
          <div className={styles.description}>Win %</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>{statistics?.currentStreak || 0}</div>
          <div className={styles.description}>Current Streak</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>{statistics?.maxStreak || 0}</div>
          <div className={styles.description}>Max Streak</div>
        </div>
      </div>
      <h1>Guess Distribution</h1>
      <div className={styles.distribution}>
        {Object.entries(
          statistics?.guesses || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
        )?.map(([key, value], index) => {
          if (key === 'fail') {
            return null;
          }

          return (
            <div key={`guess${index}`} className={styles.guess}>
              <div className={styles.index}>{index + 1}</div>
              <div className={styles['bar-background']}>
                <div
                  className={styles.bar}
                  style={{ width: `${getGuessPercentage(value as number)}%` }}
                >
                  {value as string}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MenuButton>
  );
};

export default Statistics;
