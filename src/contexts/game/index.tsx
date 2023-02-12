import { createContext, ReactNode, useContext, useReducer } from 'react';
import { gameReducer } from './gameReducer';
import { getInitialState } from './getInitialState';

type GameFunctions = {
  onKeyPress: (value: string) => void;
  setAlert: (value: string) => void;
};

const GameContext = createContext<[GameState, GameFunctions]>([
  getInitialState(),
  {
    onKeyPress: () => console.log('game context is not ready yet'),
    setAlert: () => console.log('game context is not ready yet'),
  },
]);

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
