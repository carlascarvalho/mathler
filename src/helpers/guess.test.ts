import { checkGuessStatus } from './guess';

describe('checkGuessStatus', () => {
  const solution = {
    equation: '21/7+2',
    result: 5,
    map: {
      '2': [0, 5],
      '1': [1],
      '/': [2],
      '7': [3],
      '+': [4],
    },
  };

  it('should return the correct statuses', () => {
    let result = checkGuessStatus(['1', '+', '1'], solution);
    expect(result).toEqual([
      { element: '1', status: 'present' },
      { element: '+', status: 'present' },
      { element: '1', status: 'absent' },
    ]);

    result = checkGuessStatus(['2', '/', '1', '+', '2', '9'], solution);
    expect(result).toEqual([
      { element: '2', status: 'correct' },
      { element: '/', status: 'present' },
      { element: '1', status: 'present' },
      { element: '+', status: 'present' },
      { element: '2', status: 'present' },
      { element: '9', status: 'absent' },
    ]);

    result = checkGuessStatus(['3', '*', '8', '-', '6', '9'], solution);
    expect(result).toEqual([
      { element: '3', status: 'absent' },
      { element: '*', status: 'absent' },
      { element: '8', status: 'absent' },
      { element: '-', status: 'absent' },
      { element: '6', status: 'absent' },
      { element: '9', status: 'absent' },
    ]);

    result = checkGuessStatus(['2', '1', '/', '7', '+', '2'], solution);
    expect(result).toEqual([
      { element: '2', status: 'correct' },
      { element: '1', status: 'correct' },
      { element: '/', status: 'correct' },
      { element: '7', status: 'correct' },
      { element: '+', status: 'correct' },
      { element: '2', status: 'correct' },
    ]);
  });

  it('should return an empty array if guess is empty', () => {
    let result = checkGuessStatus([], solution);
    expect(result).toEqual([]);
  });
});
