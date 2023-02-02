import config from '../config';

function evalEquation(equation: string) {
  return new Function(`return ${equation}`)();
}

function getSolutionMap(equation: string): SolutionMap {
  const initialState: SolutionMap = {};

  return equation.split('').reduce((map, char, i) => {
    if (!map[char]) {
      map[char] = [];
    }

    map[char].push(i);

    return map;
  }, initialState);
}

export function getEquation(): Solution {
  const today = new Date();
  const dateNumber = parseInt(`${today.getDate()}${today.getMonth()}`, 10);

  const equationIndex = dateNumber % config.equations.length;
  const equation = config.equations[equationIndex];

  const result = evalEquation(equation);

  return { equation, result, map: getSolutionMap(equation) };
}

export function validateEquation(
  equation: string,
  equationResult: number,
  requiredLength: number
) {
  if (/(?<=\D|^)0+\d+/g.test(equation)) {
    return {
      isValid: false,
      error: `Numbers shouldn't have leading zeros.`,
    };
  }

  if (/([\+\-\/\*][\+\-\/\*]+)/g.test(equation)) {
    return {
      isValid: false,
      error: `Two or more operators can't come in sequence.`,
    };
  }

  if (
    equation.length < requiredLength ||
    !/(\d[\+\-\/\*]\d)+/g.test(equation)
  ) {
    return {
      isValid: false,
      error: `Not enough numbers and/or operators.`,
    };
  }

  if (!/^[^/*].*\d$/g.test(equation)) {
    return {
      isValid: false,
      error: `Equations shouldn't start or end with an operator.`,
    };
  }

  if (evalEquation(equation) !== equationResult) {
    return {
      isValid: false,
      error: `The equation result must be ${equationResult}`,
    };
  }

  return {
    isValid: true,
  };
}
