import { createContext, ReactNode, useContext, useReducer } from 'react';
import { getEquation } from '../helpers/equations';

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
  //TODO - implement keyboard actions
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
