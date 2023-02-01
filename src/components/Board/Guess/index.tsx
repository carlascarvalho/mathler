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
    <div className={styles.guess}>
      {elementsWithPositionStatus?.map(({ element, status }, i) => {
        return (
          <div className={`${styles.tile} ${status && styles[status]}`} key={i}>
            {element}
          </div>
        );
      })}
    </div>
  );
};

export default Guess;
