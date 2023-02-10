const operators = ['+', '-', '*', '/'];

function generateWithTwoOperators(numEquations = 100) {
  const equations = {};

  while (Object.keys(equations).length < numEquations) {
    const twoDigtsNum = randomInteger(10, 99);
    const oneDigtsNum1 = randomInteger(0, 9);
    const oneDigtsNum2 = randomInteger(0, 9);
    const randomNums = [twoDigtsNum, oneDigtsNum1, oneDigtsNum2];
    shuffle(randomNums);

    const firstOperator =
      operators[Math.floor(Math.random() * operators.length)];
    const secondOperator =
      operators[Math.floor(Math.random() * operators.length)];

    let equation =
      randomNums[0] +
      firstOperator +
      randomNums[1] +
      secondOperator +
      randomNums[2];

    const result = new Function(`return ${equation}`)();

    if (isValidEquation(equation, result)) {
      equations[equation] = result;
    }
  }

  return Object.keys(equations);
}

function generateWithOneOperator(numEquations = 100) {
  const equations = {};

  while (Object.keys(equations).length < numEquations) {
    const twoDigtsNum = randomInteger(10, 99);
    const threeDigtsNum = randomInteger(100, 999);
    const randomNums = [twoDigtsNum, threeDigtsNum];
    shuffle(randomNums);

    const firstOperator =
      operators[Math.floor(Math.random() * operators.length)];

    let equation = randomNums[0] + firstOperator + randomNums[1];

    const result = new Function(`return ${equation}`)();

    if (isValidEquation(equation, result)) {
      equations[equation] = result;
    }
  }

  return Object.keys(equations);
}

function isValidEquation(equation, result) {
  return (
    Number.isInteger(result) &&
    result > 0 &&
    result < 1000 &&
    !equations[equation] &&
    !equation.startsWith('0/') &&
    !equation.includes('+0/') &&
    !equation.includes('-0/') &&
    !equation.includes('*0/') &&
    !equation.includes('/0/')
  );
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const equationsWithTwoOperators = generateWithTwoOperators(100);

console.log(equationsWithTwoOperators);
