import Head from 'next/head';
import Alert from '../components/Alert';
import Help from '../components/Menu/Help';
import Statistics from '../components/Menu/Statistics';
import { useGame } from '../contexts/game';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

const Board = dynamic(() => import('../components/Board'), {
  ssr: false,
});
const Keyboard = dynamic(() => import('../components/Keyboard'), {
  ssr: false,
});

export default function Home() {
  const [gameState] = useGame();

  return (
    <>
      <Head>
        <title>Mathler</title>
        <meta name='description' content='A Mathler copycat' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Mathler</h1>
          <div className={styles.menu}>
            <Help />
            <Statistics />
          </div>
          <h3>
            Find the equation that equals {gameState.solution?.result || ''}
          </h3>
        </div>
        <div className={styles.body}>
          <Board />
          <Keyboard />
          <Alert />
        </div>
      </main>
      <div id='modal-root'></div>
    </>
  );
}
