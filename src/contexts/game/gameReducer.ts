import { validateEquation } from '../../helpers/equations';
import keys from '../../helpers/keys';
import { storage } from '../../helpers/storage';

export const gameReducer = (
  state: GameState,
  { type, payload }: GameAction
): GameState => {
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
