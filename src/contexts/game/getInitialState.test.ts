import { storage } from '../../helpers/storage';
import keys from '../../helpers/keys';
import { getInitialState } from './getInitialState';

jest.mock('../../helpers/equations', () => {
  const originalModule = jest.requireActual('../../helpers/equations');

  return {
    __esModule: true,
    ...originalModule,
    getEquation: jest.fn(() => {
      return {
        equation: '24/6+4',
        map: { '2': [0], '4': [1, 5], '/': [2], '6': [3], '+': [4] },
        result: 8,
      };
    }),
  };
});

jest.mock('../../helpers/storage', () => {
  const originalModule = jest.requireActual('../../helpers/storage');

  return {
    __esModule: true,
    ...originalModule,
    storage: {
      ...originalModule.storage,
      getGameState: jest.fn(),
      getGameTimestamp: jest.fn(),
    },
  };
});

describe('getInitialState', () => {
  const mockGetGameState = storage.getGameState as jest.Mock;
  const mockGetGameTimestamp = storage.getGameTimestamp as jest.Mock;

  beforeEach(() => {
    mockGetGameState.mockClear();
    mockGetGameTimestamp.mockClear();
  });

  it('should return reset state if local storage is empty', () => {
    mockGetGameState.mockReturnValue({});

    const initialState = getInitialState();
    expect(initialState.alert).toBe('');
    expect(initialState.guesses).toEqual([
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
    ]);
    expect(initialState.keys).toEqual(keys.generate());
    expect(initialState.status).toBe('inprogress');
    expect(initialState.solution.equation).toBe('24/6+4');
    expect(initialState.solution.result).toBe(8);
    expect(initialState.solution.map).toEqual({
      '2': [0],
      '4': [1, 5],
      '/': [2],
      '6': [3],
      '+': [4],
    });
  });

  it('should return reset state if existing timestamp is invalid', () => {
    mockGetGameState.mockReturnValue({
      guesses: [
        { value: '20/2-2', submitted: true },
        { value: '24/4+2', submitted: true },
        { value: '24/6+4', submitted: true },
        { value: '', submitted: false },
        { value: '', submitted: false },
        { value: '', submitted: false },
      ],
      status: 'win',
      keys: {
        '0': { status: 'absent' },
        '1': { status: '' },
        '2': { status: 'correct' },
        '3': { status: '' },
        '4': { status: 'correct' },
        '5': { status: '' },
        '6': { status: 'correct' },
        '7': { status: '' },
        '8': { status: '' },
        '9': { status: '' },
        '+': { status: 'correct' },
        '-': { status: 'absent' },
        '*': { status: '' },
        '/': { status: 'correct' },
      },
    });

    const today = new Date();
    const timestamp = parseInt(`${today.getMonth() + 1}${today.getDate()}`, 10);
    mockGetGameTimestamp.mockReturnValue(timestamp + 1);

    const initialState = getInitialState();
    expect(initialState.alert).toBe('');
    expect(initialState.guesses).toEqual([
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
    ]);
    expect(initialState.keys).toEqual(keys.generate());
    expect(initialState.status).toBe('inprogress');
    expect(initialState.solution.equation).toBe('24/6+4');
    expect(initialState.solution.result).toBe(8);
    expect(initialState.solution.map).toEqual({
      '2': [0],
      '4': [1, 5],
      '/': [2],
      '6': [3],
      '+': [4],
    });
  });

  it('should return pre-existing state if local storage is not empty and existing timestamp is still valid', () => {
    mockGetGameState.mockReturnValue({
      guesses: [
        { value: '20/2-2', submitted: true },
        { value: '24/4+2', submitted: true },
        { value: '24/6+4', submitted: true },
        { value: '', submitted: false },
        { value: '', submitted: false },
        { value: '', submitted: false },
      ],
      status: 'win',
      keys: {
        '0': { status: 'absent' },
        '1': { status: '' },
        '2': { status: 'correct' },
        '3': { status: '' },
        '4': { status: 'correct' },
        '5': { status: '' },
        '6': { status: 'correct' },
        '7': { status: '' },
        '8': { status: '' },
        '9': { status: '' },
        '+': { status: 'correct' },
        '-': { status: 'absent' },
        '*': { status: '' },
        '/': { status: 'correct' },
      },
    });

    const today = new Date();
    const timestamp = parseInt(`${today.getMonth() + 1}${today.getDate()}`, 10);
    mockGetGameTimestamp.mockReturnValue(timestamp);

    const initialState = getInitialState();
    expect(initialState.alert).toBe('');
    expect(initialState.guesses).toEqual([
      { value: '20/2-2', submitted: true },
      { value: '24/4+2', submitted: true },
      { value: '24/6+4', submitted: true },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
    ]);
    expect(initialState.keys).toEqual({
      '0': { status: 'absent' },
      '1': { status: '' },
      '2': { status: 'correct' },
      '3': { status: '' },
      '4': { status: 'correct' },
      '5': { status: '' },
      '6': { status: 'correct' },
      '7': { status: '' },
      '8': { status: '' },
      '9': { status: '' },
      '+': { status: 'correct' },
      '-': { status: 'absent' },
      '*': { status: '' },
      '/': { status: 'correct' },
    });
    expect(initialState.status).toBe('win');
    expect(initialState.solution.equation).toBe('24/6+4');
    expect(initialState.solution.result).toBe(8);
    expect(initialState.solution.map).toEqual({
      '2': [0],
      '4': [1, 5],
      '/': [2],
      '6': [3],
      '+': [4],
    });
  });
});
