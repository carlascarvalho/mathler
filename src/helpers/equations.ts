import config from '../config';

function evalEquation(equation: string) {
  return new Function(`return ${equation}`)();
}

export function getEquation(): Solution {
  const today = new Date();
  const dateNumber = parseInt(`${today.getDate()}${today.getMonth()}`, 10);

  const equationIndex = dateNumber % config.equations.length;
  const equation = config.equations[equationIndex];

  const result = evalEquation(equation);

  return { equation, result };
}
