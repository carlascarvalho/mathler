import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const Help: React.FC = () => {
  return (
    <MenuButton icon={faCircleQuestion} modalOpenOnInit>
      <h1>How To Play</h1>
      <p>Try to find the hidden calculation in 6 guesses!</p>
      <p>
        After each guess, the color of the tiles will change to show how close
        you are to the solution.
      </p>
      <div className={styles.example}>
        <div className={styles.correct}>5</div>
        <div className={styles.absent}>0</div>
        <div className={styles.correct}>/</div>
        <div className={styles.present}>5</div>
        <div className={styles.absent}>-</div>
        <div className={styles.absent}>2</div>
      </div>
      <ul>
        <li>Green are in the correct place.</li>
        <li>Orange are in the equation, but in a different place.</li>
        <li>Gray are not in the equation.</li>
      </ul>
      <h1>Additional Rules</h1>
      <ul>
        <li>Numbers and operators can appear multiple times.</li>
        <li>Calculate / or * before - or + (order of operations).</li>
      </ul>
    </MenuButton>
  );
};

export default Help;
