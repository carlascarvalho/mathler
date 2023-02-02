import { createContext, ReactNode, useContext, useReducer } from 'react';
import { getEquation, validateEquation } from '../helpers/equations';

type GameFunctions = {
  onKeyPress: (value: string) => void;
  setAlert: (value: string) => void;
};

interface State {
  guesses: Guess[];
  solution: Solution;
  alert: string;
}

const initialState = {
  guesses: Array(6).fill({ value: '', submitted: false }),
  solution: getEquation(),
  alert: '',
};

const GameContext = createContext<[State, GameFunctions]>([
  initialState,
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
      const someFinalizedGuessMatchSolution = state.guesses.some(
        (guess) => guess.submitted && guess.value === state.solution.equation
      );

      const currentGuessIndex = state.guesses.findIndex(
        (guess) => !guess.submitted
      );

      const isGameOver =
        someFinalizedGuessMatchSolution || currentGuessIndex < 0;

      if (isGameOver) {
        return state;
      }

      const guesses = JSON.parse(JSON.stringify(state.guesses));
      const currentGuess = guesses[currentGuessIndex];

      const isNumberOrOperator = /(^[0-9/*\-+]$)/g.test(payload.value);

      if (isNumberOrOperator && currentGuess.value.length < 6) {
        currentGuess.value += payload.value;

        return { ...state, guesses };
      }

      if (payload.value === 'Backspace' && currentGuess.value.length > 0) {
        currentGuess.value = currentGuess.value.slice(0, -1);

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

        currentGuess.submitted = true;

        return { ...state, guesses };
      }

      return state;
    default:
      return state;
  }
};

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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
