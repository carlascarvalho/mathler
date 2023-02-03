declare interface AlertAction {
  type: 'alert';
  payload: {
    value: string;
  };
}

declare interface KeyboardAction {
  type: 'keyboard';
  payload: {
    value: string;
  };
}

declare type GameAction = KeyboardAction | AlertAction;

declare type GameStatus = 'win' | 'fail' | 'inprogress';

declare interface Guess {
  value: string;
  submitted: boolean;
}

declare type Keys = { [key: string]: { status: string } };

declare interface SolutionMap {
  [key: string]: number[];
}

declare interface Solution {
  equation: string;
  result: number;
  map: SolutionMap;
}
