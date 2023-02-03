import { createContext, ReactNode, useContext, useReducer } from 'react';
import { getEquation, validateEquation } from '../helpers/equations';
import keys from '../helpers/keys';
import { storage } from '../helpers/storage';

type GameFunctions = {
  onKeyPress: (value: string) => void;
  setAlert: (value: string) => void;
};

interface State {
  alert: string;
  guesses: Guess[];
  keys: Keys;
  solution: Solution;
  status: GameStatus;
}

const getInitialState = () => {
  const today = new Date();
  const currentTimestamp = parseInt(
    `${today.getDate()}${today.getMonth()}`,
    10
  );

  const lastGameTimestamp = storage.getGameTimestamp();

  const initialState: State = {
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

const GameContext = createContext<[State, GameFunctions]>([
  getInitialState(),
  {
    onKeyPress: () => console.log('game context is not ready yet'),
    setAlert: () => console.log('game context is not ready yet'),
  },
]);

const gameReducer = (state: State, { type, payload }: GameAction): State => {
  switch (type) {
    case 'alert':
      return { ...state, alert: payload.value };

    case 'keyboard':
      if (state.status !== 'inprogress') {
        return state;
      }

      const currentGuessIndex = state.guesses.findIndex(
        (guess) => !guess.submitted
      );

      const guesses = JSON.parse(JSON.stringify(state.guesses));
      const currentGuess = guesses[currentGuessIndex];

      const isNumberOrOperator = /(^[0-9/*\-+]$)/g.test(payload.value);

      if (isNumberOrOperator && currentGuess.value.length < 6) {
        currentGuess.value += payload.value;

        storage.setGameState(guesses, state.status, state.keys);
        return { ...state, guesses };
      }

      if (payload.value === 'Backspace' && currentGuess.value.length > 0) {
        currentGuess.value = currentGuess.value.slice(0, -1);

        storage.setGameState(guesses, state.status, state.keys);
        return { ...state, guesses };
      }

      if (payload.value === 'Enter') {
        const validation = validateEquation(
          currentGuess.value,
          state.solution.result,
          6
        );

        if (!validation.isValid) {
          return { ...state, alert: validation.error || 'Invalid equation.' };
        }

        const updatedKeys = keys.updateStatuses(
          state.keys,
          state.solution.equation,
          currentGuess.value
        );

        currentGuess.submitted = true;

        const previousGuessMatchesSolution = state.guesses.some(
          (guess) => guess.submitted && guess.value === state.solution.equation
        );

        const nextGuessIndex = state.guesses.findIndex(
          (guess) => !guess.submitted
        );

        if (
          previousGuessMatchesSolution ||
          currentGuess.value === state.solution.equation
        ) {
          const status = 'win';
          storage.setGameStatistics(nextGuessIndex);
          storage.setGameState(guesses, status, updatedKeys);
          return { ...state, guesses, status, keys: updatedKeys };
        }

        const isLastGuess = nextGuessIndex + 1 >= 6;
        if (isLastGuess) {
          const status = 'fail';
          storage.setGameStatistics(-1);
          storage.setGameState(guesses, status, updatedKeys);
          return { ...state, guesses, status, keys: updatedKeys };
        }

        storage.setGameState(guesses, state.status, updatedKeys);
        return { ...state, guesses, keys: updatedKeys };
      }

      return state;
    default:
      return state;
  }
};

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());

  const onKeyPress = (value: string) => {
    dispatch({ type: 'keyboard', payload: { value } });
  };

  const setAlert = (value: string) => {
    dispatch({ type: 'alert', payload: { value } });
  };

  return (
    <GameContext.Provider value={[state, { onKeyPress, setAlert }]}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
