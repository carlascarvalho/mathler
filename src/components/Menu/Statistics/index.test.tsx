import { render } from '@testing-library/react';
import { storage } from '../../../helpers/storage';
import Statistics from '.';

jest.mock('../../../helpers/storage', () => {
  const originalModule = jest.requireActual('../../../helpers/storage');

  return {
    __esModule: true,
    ...originalModule,
    storage: {
      ...originalModule.storage,
      getGameStatistics: jest.fn(),
    },
  };
});

const MenuButtonMock: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};

jest.mock(
  '../MenuButton',
  (): React.FC<{ children: React.ReactNode }> =>
    ({ children }) =>
      <MenuButtonMock>{children}</MenuButtonMock>
);

describe('Statistics', () => {
  const mockGetGameStatistics = storage.getGameStatistics as jest.Mock;

  beforeEach(() => {
    mockGetGameStatistics.mockClear();
  });

  it('statistcs are updated correctly from storage data', () => {
    mockGetGameStatistics.mockReturnValue({
      guesses: { '1': 2, '2': 0, '3': 1, '4': 0, '5': 0, '6': 1, fail: 4 },
      currentStreak: 1,
      maxStreak: 2,
    });

    const { getByTestId, getAllByTestId } = render(<Statistics />);

    expect(getByTestId('num-played').textContent).toEqual('8');
    expect(getByTestId('win-percentage').textContent).toEqual('50');
    expect(getByTestId('current-streak').textContent).toEqual('1');
    expect(getByTestId('max-streak').textContent).toEqual('2');

    const guessDistributions = getAllByTestId('guess-distribution');

    expect(guessDistributions[0].textContent).toEqual('2');
    expect(guessDistributions[1].textContent).toEqual('0');
    expect(guessDistributions[2].textContent).toEqual('1');
    expect(guessDistributions[3].textContent).toEqual('0');
    expect(guessDistributions[4].textContent).toEqual('0');
    expect(guessDistributions[5].textContent).toEqual('1');
  });
});
