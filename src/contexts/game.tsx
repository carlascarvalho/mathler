import { createContext, ReactNode, useContext, useReducer } from 'react';
import { getEquation, validateEquation } from '../helpers/equations';

type GameFunctions = {
  keyPressed: (value: string) => void;
};

interface State {
  guesses: Guess[];
  solution: Solution;
}

const initialState = {
  guesses: Array(6).fill({ value: '', submitted: false }),
  solution: getEquation(),
};

const GameContext = createContext<[State, GameFunctions]>([
  initialState,
  { keyPressed: () => console.log('game context is not ready yet') },
]);

const gameReducer = (state: State, { payload }: KeyboardAction): State => {
  const someFinalizedGuessMatchSolution = state.guesses.some(
    (guess) => guess.submitted && guess.value === state.solution.equation
  );

  const currentGuessIndex = state.guesses.findIndex(
    (guess) => !guess.submitted
  );

  const isGameOver = someFinalizedGuessMatchSolution || currentGuessIndex < 0;

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

  if (payload.value === 'Enter' && currentGuess.value.length === 6) {
    const validation = validateEquation(
      currentGuess.value,
      state.solution.result,
      6
    );

    if (!validation.isValid) {
      return state;
    }

    currentGuess.submitted = true;

    return { ...state, guesses };
  }

  return state;
};

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const keyPressed = (value: string) => {
    dispatch({ type: 'keyboard', payload: { value } });
  };

  return (
    <GameContext.Provider value={[state, { keyPressed }]}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
