const operators = ['+', '-', '*', '/'];

function generate() {
  const keys: Keys = {};
  for (let i = 0; i < 10; i++) {
    keys[i] = { status: '' };
  }

  operators.forEach((operator) => {
    keys[operator] = { status: '' };
  });

  return keys;
}

function updateStatuses(keys: Keys, equation: string, guess: string) {
  const updatedKeys = JSON.parse(JSON.stringify(keys)) as Keys;

  guess.split('').forEach((element, index) => {
    const currentKey = keys[element];

    if (currentKey.status === 'correct') {
      updatedKeys[element] = { status: currentKey.status };
      return;
    }

    if (element === equation[index]) {
      updatedKeys[element] = { status: 'correct' };
      return;
    }

    if (equation.includes(element)) {
      updatedKeys[element] = { status: 'present' };
      return;
    }

    if (currentKey.status !== '') {
      updatedKeys[element] = { status: currentKey.status };
      return;
    }

    updatedKeys[element] = { status: 'absent' };
  });

  return updatedKeys;
}

const keys = {
  generate,
  updateStatuses,
};

export default keys;
