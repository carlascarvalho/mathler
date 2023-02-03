export function checkGuessStatus(guess: string[], solution: Solution) {
  const map = JSON.parse(JSON.stringify(solution.map)) as SolutionMap;

  const guessWithStatus = guess.map((element, i) => {
    if (element === solution.equation[i]) {
      map[element] = map[element].filter((index) => index !== i);

      return { element, status: 'correct' };
    }

    if (!map[element]) {
      return { element, status: 'absent' };
    }

    return { element, status: '' };
  });

  return guessWithStatus.map((guessItem, i) => {
    if (guessItem.status) {
      return guessItem;
    }
    const { element } = guessItem;

    if (!map[element].length) {
      guessItem.status = 'absent';
    } else {
      map[element].pop();
      guessItem.status = 'present';
    }

    return guessItem;
  });
}
