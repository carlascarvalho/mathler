declare interface KeyboardAction {
  type: 'keyboard';
  payload: {
    value: string;
  };
}

declare interface AlertAction {
  type: 'alert';
  payload: {
    value: string;
  };
}

declare type GameAction = KeyboardAction | AlertAction;
