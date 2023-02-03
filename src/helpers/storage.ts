const isBrowser: boolean = typeof window !== 'undefined';

function getGameState() {
  if (!isBrowser) {
    return;
  }

  return JSON.parse(localStorage?.getItem('gameState') || '{}');
}

function setGameState(
  guesses: Guess[],
  status: GameStatus = 'inprogress',
  keys: Keys
) {
  if (!isBrowser) {
    return;
  }

  localStorage?.setItem('gameState', JSON.stringify({ guesses, status, keys }));
}

function clearGameState() {
  if (!isBrowser) {
    return;
  }

  localStorage?.removeItem('gameState');
}

function getGameTimestamp() {
  if (!isBrowser) {
    return;
  }

  return parseInt(localStorage?.getItem('gameTimestamp') || '-1');
}

function setGameTimestamp(timestamp: number) {
  if (!isBrowser) {
    return;
  }

  localStorage?.setItem('gameTimestamp', `${timestamp}`);
}

function getGameStatistics() {
  if (!isBrowser) {
    return;
  }

  return JSON.parse(localStorage?.getItem('gameStatistics') || '{}');
}

function setGameStatistics(currentGuessAttempt: number) {
  if (!isBrowser || getGameState().status !== 'inprogress') {
    return;
  }

  const gameStatistics = JSON.parse(
    localStorage?.getItem('gameStatistics') || '{}'
  );

  if (!localStorage?.getItem('gameStatistics')) {
    gameStatistics.guesses = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 };
    gameStatistics.currentStreak = 0;
    gameStatistics.maxStreak = 0;
  }

  const key = currentGuessAttempt === -1 ? 'fail' : currentGuessAttempt + 1;

  gameStatistics.guesses[key]++;

  gameStatistics.maxStreak = Math.max(
    gameStatistics.maxStreak,
    gameStatistics.currentStreak
  );

  if (key === 'fail') {
    gameStatistics.currentStreak = 0;
  } else {
    gameStatistics.currentStreak = 1;
  }

  localStorage?.setItem('gameStatistics', JSON.stringify(gameStatistics));
}

export const storage = {
  getGameState,
  setGameState,
  clearGameState,
  getGameTimestamp,
  setGameTimestamp,
  getGameStatistics,
  setGameStatistics,
};
