import { checkGuessStatus } from '../../../helpers/checkGuessStatus';
import styles from './index.module.css';

type Props = {
  guess: Guess;
  solution: Solution;
};

const Guess: React.FC<Props> = ({ guess, solution }) => {
  const elements = guess.value.padEnd(6).split('');

  let elementsWithPositionStatus = elements.map((element, i) => ({
    element,
    status: element === ' ' ? '' : 'current-guess',
  }));

  if (guess.submitted) {
    elementsWithPositionStatus = checkGuessStatus(elements, solution);
  }

  return (
    <div
      className={`${styles.guess} ${guess.submitted ? styles.submitted : ''}`}
    >
      {elementsWithPositionStatus?.map(({ element, status }, i) => {
        const isCurrent = guess.value.length - 1 === i;
        const isFilled = element !== ' ';

        return (
          <div
            className={`
              ${styles.tile}
              ${isCurrent && styles.current}
              ${isFilled && styles.filled}
              ${status && styles[status]}
            `}
            key={i}
          >
            <div className={`${styles.front}`}>{element}</div>
            <div className={`${styles.back}`}>{element}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Guess;
