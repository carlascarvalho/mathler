import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { GameProvider, useGame } from '.';
import { validationMessages } from '../../helpers/equations';

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

describe('useGame', () => {
  const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <GameProvider>{children}</GameProvider>;
  };

  it('setAlert changes alert value in game state correctly', () => {
    // result.current = [state, {onKeyPress, setAlert}]
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current[1].setAlert('Test Alert');
    });

    expect(result.current[0].alert).toBe('Test Alert');

    act(() => {
      result.current[1].setAlert('Test Alert 2');
    });

    expect(result.current[0].alert).toBe('Test Alert 2');
  });

  it('only computes pressed keys that are numbers or operators', () => {
    // result.current = [state, {onKeyPress, setAlert}]
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current[1].onKeyPress('a');
      result.current[1].onKeyPress('=');
    });

    expect(result.current[0].guesses).toEqual([
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
    ]);

    act(() => {
      result.current[1].onKeyPress('2');
      result.current[1].onKeyPress('4');
    });

    expect(result.current[0].guesses).toEqual([
      { value: '24', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
    ]);
  });

  it('Guess is being validated correctly when Enter is pressed', () => {
    // result.current = [state, {onKeyPress, setAlert}]
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current[1].onKeyPress('/');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].alert).toBe(
      validationMessages.NOT_ENOUGH_NUMBERS_OR_OPERATORS
    );

    act(() => {
      result.current[1].onKeyPress('/');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].alert).toBe(
      validationMessages.OPERATORS_IN_SEQUENCE
    );

    act(() => {
      result.current[1].onKeyPress('Backspace');
      result.current[1].onKeyPress('0');
      result.current[1].onKeyPress('1');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].alert).toBe(validationMessages.LEADING_ZEROS);

    act(() => {
      result.current[1].onKeyPress('Backspace');
      result.current[1].onKeyPress('Backspace');
      result.current[1].onKeyPress('2');
      result.current[1].onKeyPress('4');
      result.current[1].onKeyPress('-');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].alert).toBe(
      validationMessages.POSITION_OF_OPERATORS
    );

    act(() => {
      result.current[1].onKeyPress('Backspace');
      result.current[1].onKeyPress('Backspace');
      result.current[1].onKeyPress('-');
      result.current[1].onKeyPress('2');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].alert).toContain(
      validationMessages.RESULT_MUST_BE_EQUAL
    );
  });

  it('Guess is submitted correctly on Enter', () => {
    // result.current = [state, {onKeyPress, setAlert}]
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current[1].onKeyPress('Backspace');
      result.current[1].onKeyPress('4');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].guesses).toEqual([
      { value: '24/2-4', submitted: true },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
      { value: '', submitted: false },
    ]);
  });

  it('Keys statuses are updating correctly when guess is submitted', () => {
    // result.current = [state, {onKeyPress, setAlert}]
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current[1].onKeyPress('2');
      result.current[1].onKeyPress('4');
      result.current[1].onKeyPress('/');
      result.current[1].onKeyPress('8');
      result.current[1].onKeyPress('+');
      result.current[1].onKeyPress('5');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].keys).toEqual({
      '0': { status: '' },
      '1': { status: '' },
      '2': { status: 'correct' },
      '3': { status: '' },
      '4': { status: 'correct' },
      '5': { status: 'absent' },
      '6': { status: '' },
      '7': { status: '' },
      '8': { status: 'absent' },
      '9': { status: '' },
      '+': { status: 'correct' },
      '-': { status: 'absent' },
      '*': { status: '' },
      '/': { status: 'correct' },
    });
  });

  it('Game status is updating correctly correct guess is submitted', () => {
    // result.current = [state, {onKeyPress, setAlert}]
    const { result } = renderHook(() => useGame(), { wrapper });

    expect(result.current[0].status).toBe('inprogress');

    act(() => {
      result.current[1].onKeyPress('2');
      result.current[1].onKeyPress('4');
      result.current[1].onKeyPress('/');
      result.current[1].onKeyPress('6');
      result.current[1].onKeyPress('+');
      result.current[1].onKeyPress('4');
      result.current[1].onKeyPress('Enter');
    });

    expect(result.current[0].status).toBe('win');
  });
});
