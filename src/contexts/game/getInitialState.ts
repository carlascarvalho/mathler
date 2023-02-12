import { getEquation } from '../../helpers/equations';
import keys from '../../helpers/keys';
import { storage } from '../../helpers/storage';

export const getInitialState = () => {
  const today = new Date();
  const currentTimestamp = parseInt(
    `${today.getMonth() + 1}${today.getDate()}`,
    10
  );

  const lastGameTimestamp = storage.getGameTimestamp();

  const initialState: GameState = {
    alert: '',
    guesses: Array(6).fill({ value: '', submitted: false }),
    keys: keys.generate(),
    status: 'inprogress' as GameStatus,
    solution: getEquation(currentTimestamp),
  };

  if (lastGameTimestamp !== currentTimestamp) {
    storage.clearGameState();
    storage.setGameState(
      initialState.guesses,
      initialState.status,
      initialState.keys
    );
    storage.setGameTimestamp(currentTimestamp);
  } else {
    const gameState = storage.getGameState();
    initialState.guesses = gameState.guesses;
    initialState.keys = gameState.keys;
    initialState.status = gameState.status;
  }

  return initialState;
};
