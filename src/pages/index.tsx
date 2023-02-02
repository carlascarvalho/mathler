import Head from 'next/head';
import Alert from '../components/Alert';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';
import { useGame } from '../contexts/game';
import styles from '../styles/Home.module.css';

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
          <div className='menu'>
            <div className='help'></div>
            <div className='settings'></div>
            <div className='statistics'></div>
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
    </>
  );
}
