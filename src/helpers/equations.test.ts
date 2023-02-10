import {
  evalEquation,
  getEquation,
  getSolutionMap,
  validateEquation,
  validationMessages,
} from './equations';

describe('getEquation', () => {
  it('expect 2 equations with the same timestamp to be the same', () => {
    const solution1 = getEquation(31);
    const solution2 = getEquation(31);
    expect(solution1).toEqual(solution2);
  });

  it('expect 2 equations with different timestamp to be different', () => {
    const solution1 = getEquation(31);
    const solution2 = getEquation(32);
    expect(solution1).not.toEqual(solution2);
  });

  it('expect solution.equation result to match solution.result', () => {
    const solution = getEquation(31);
    expect(evalEquation(solution.equation)).toEqual(solution.result);
  });
});

describe('getSolutionMap', () => {
  it('expect maps to match', () => {
    const result = getSolutionMap('21/7+2');
    expect(result).toEqual({
      '2': [0, 5],
      '1': [1],
      '/': [2],
      '7': [3],
      '+': [4],
    });
  });

  it('expect maps not to match', () => {
    const result = getSolutionMap('21/7+9');
    expect(result).not.toEqual({
      '2': [0, 5],
      '1': [1],
      '/': [2],
      '7': [3],
      '+': [4],
    });
  });
});

describe('validateEquation', () => {
  it('21+3 with result 24 and length 4 should be valid', () => {
    const result = validateEquation('21+3', 24, 4);
    expect(result.isValid).toEqual(true);
    expect(result.error).toBeUndefined();
  });

  it('21+0 with result 21 and length 4 should be valid', () => {
    const result = validateEquation('21+0', 21, 4);
    expect(result.isValid).toEqual(true);
    expect(result.error).toBeUndefined();
  });

  it('01+3 with result 4 and length 4 should be invalid with LEADING_ZEROS message', () => {
    const result = validateEquation('01+3', 4, 4);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(`${validationMessages.LEADING_ZEROS}`);
  });

  it('1+03 with result 4 and length 4 should be invalid with LEADING_ZEROS message', () => {
    const result = validateEquation('1+03', 4, 4);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(`${validationMessages.LEADING_ZEROS}`);
  });

  it('21++3 with result 24 and length 5 should be invalid with OPERATORS_IN_SEQUENCE message', () => {
    const result = validateEquation('21++3', 24, 5);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(`${validationMessages.OPERATORS_IN_SEQUENCE}`);
  });

  it('21+3 with result 24 and length 8 should be invalid with NOT_ENOUGH_NUMBERS_OR_OPERATORS message', () => {
    const result = validateEquation('21+3', 24, 8);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(
      `${validationMessages.NOT_ENOUGH_NUMBERS_OR_OPERATORS}`
    );
  });

  it('1234 with result 1234 and length 4 should be invalid with NOT_ENOUGH_NUMBERS_OR_OPERATORS message', () => {
    const result = validateEquation('1234', 1234, 4);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(
      `${validationMessages.NOT_ENOUGH_NUMBERS_OR_OPERATORS}`
    );
  });

  it('21+3+ with result 24 and length 5 should be invalid with POSITION_OF_OPERATORS message', () => {
    const result = validateEquation('21+3+', 24, 5);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(`${validationMessages.POSITION_OF_OPERATORS}`);
  });

  it('+21+3+ with result 24 and length 6 should be invalid with POSITION_OF_OPERATORS message', () => {
    const result = validateEquation('+21+3+', 24, 6);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(`${validationMessages.POSITION_OF_OPERATORS}`);
  });

  it('*21+3 with result 24 and length 5 should be invalid with POSITION_OF_OPERATORS message', () => {
    const result = validateEquation('*21+3+', 24, 5);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(`${validationMessages.POSITION_OF_OPERATORS}`);
  });

  it('+21+3 with result 24 and length 5 should be valid', () => {
    const result = validateEquation('+21+3', 24, 5);
    expect(result.isValid).toEqual(true);
    expect(result.error).toBeUndefined();
  });

  it('21+3 with result 14 and length 4 should be invalid with RESULT_MUST_BE_EQUAL message', () => {
    const result = validateEquation('21+3', 14, 4);
    expect(result.isValid).toEqual(false);
    expect(result.error).toEqual(
      `${validationMessages.RESULT_MUST_BE_EQUAL} 14`
    );
  });
});
