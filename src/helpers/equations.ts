import config from '../config';

export const validationMessages = {
  LEADING_ZEROS: `Numbers shouldn't have leading zeros.`,
  OPERATORS_IN_SEQUENCE: `Two or more operators can't come in sequence.`,
  NOT_ENOUGH_NUMBERS_OR_OPERATORS: `Not enough numbers and/or operators.`,
  POSITION_OF_OPERATORS: `Equations shouldn't start with * or /, or end with any operator.`,
  RESULT_MUST_BE_EQUAL: `The equation result must be`,
};

export function evalEquation(equation: string) {
  return new Function(`return ${equation}`)();
}

export function getSolutionMap(equation: string): SolutionMap {
  const initialState: SolutionMap = {};

  return equation.split('').reduce((map, char, i) => {
    if (!map[char]) {
      map[char] = [];
    }

    map[char].push(i);

    return map;
  }, initialState);
}

export function getEquation(gameTimestamp: number): Solution {
  const equationIndex = gameTimestamp % config.equations.length;
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
      error: validationMessages.LEADING_ZEROS,
    };
  }

  if (/([\+\-\/\*][\+\-\/\*]+)/g.test(equation)) {
    return {
      isValid: false,
      error: validationMessages.OPERATORS_IN_SEQUENCE,
    };
  }

  if (
    equation.length < requiredLength ||
    !/(\d[\+\-\/\*]\d)+/g.test(equation)
  ) {
    return {
      isValid: false,
      error: validationMessages.NOT_ENOUGH_NUMBERS_OR_OPERATORS,
    };
  }

  if (!/^[^/*].*\d$/g.test(equation)) {
    return {
      isValid: false,
      error: validationMessages.POSITION_OF_OPERATORS,
    };
  }

  if (evalEquation(equation) !== equationResult) {
    return {
      isValid: false,
      error: `${validationMessages.RESULT_MUST_BE_EQUAL} ${equationResult}`,
    };
  }

  return {
    isValid: true,
  };
}
