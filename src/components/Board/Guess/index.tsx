import styles from './index.module.css';

type Props = {
  guess: Guess;
  solution: Solution;
};

const Guess: React.FC<Props> = ({ guess, solution }) => {
  const elements = guess.value.padEnd(6).split('');

  return (
    <div className={styles.guess}>
      {elements?.map((element, i) => {
        return (
          <div className={styles.tile} key={i}>
            {element}
          </div>
        );
      })}
    </div>
  );
};

export default Guess;
