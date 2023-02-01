import Guess from './Guess';
import styles from './index.module.css';
import { useGame } from '../../contexts/game';

const Board: React.FC = () => {
  const [gameState] = useGame();

  return (
    <div className={styles.board}>
      {gameState.guesses.map((guess, i) => (
        <Guess key={i} guess={guess} solution={gameState.solution} />
      ))}
    </div>
  );
};

export default Board;
