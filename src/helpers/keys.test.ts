import { describe, expect, it } from 'vitest';
import keys from './keys';

describe('keys.generate', () => {
  it('should generate keys', () => {
    const result = keys.generate();
    expect(result).toEqual({
      0: { status: '' },
      1: { status: '' },
      2: { status: '' },
      3: { status: '' },
      4: { status: '' },
      5: { status: '' },
      6: { status: '' },
      7: { status: '' },
      8: { status: '' },
      9: { status: '' },
      '+': { status: '' },
      '-': { status: '' },
      '*': { status: '' },
      '/': { status: '' },
    });
  });
});

describe('keys.updateStatuses', () => {
  const initialKeys = keys.generate();

  it('should update statuses', () => {
    let result = keys.updateStatuses(initialKeys, '21/7+9', '30+2+0');
    expect(result).toEqual({
      0: { status: 'absent' },
      1: { status: '' },
      2: { status: 'present' },
      3: { status: 'absent' },
      4: { status: '' },
      5: { status: '' },
      6: { status: '' },
      7: { status: '' },
      8: { status: '' },
      9: { status: '' },
      '+': { status: 'correct' },
      '-': { status: '' },
      '*': { status: '' },
      '/': { status: '' },
    });

    result = keys.updateStatuses(result, '21/7+9', '31+2+2');
    expect(result).toEqual({
      0: { status: 'absent' },
      1: { status: 'correct' },
      2: { status: 'present' },
      3: { status: 'absent' },
      4: { status: '' },
      5: { status: '' },
      6: { status: '' },
      7: { status: '' },
      8: { status: '' },
      9: { status: '' },
      '+': { status: 'correct' },
      '-': { status: '' },
      '*': { status: '' },
      '/': { status: '' },
    });

    result = keys.updateStatuses(result, '21/7+9', '21+2+2');
    expect(result).toEqual({
      0: { status: 'absent' },
      1: { status: 'correct' },
      2: { status: 'correct' },
      3: { status: 'absent' },
      4: { status: '' },
      5: { status: '' },
      6: { status: '' },
      7: { status: '' },
      8: { status: '' },
      9: { status: '' },
      '+': { status: 'correct' },
      '-': { status: '' },
      '*': { status: '' },
      '/': { status: '' },
    });

    result = keys.updateStatuses(result, '21/7+9', '21/7+9');
    expect(result).toEqual({
      0: { status: 'absent' },
      1: { status: 'correct' },
      2: { status: 'correct' },
      3: { status: 'absent' },
      4: { status: '' },
      5: { status: '' },
      6: { status: '' },
      7: { status: 'correct' },
      8: { status: '' },
      9: { status: 'correct' },
      '+': { status: 'correct' },
      '-': { status: '' },
      '*': { status: '' },
      '/': { status: 'correct' },
    });
  });

  it('should not update keys if guess is empty', () => {
    let result = keys.updateStatuses(initialKeys, '21/7+9', '');
    expect(result).toEqual(initialKeys);
  });

  it('should mark all guessed keys as absent if equation is empty', () => {
    let result = keys.updateStatuses(initialKeys, '', '21/7+9');
    expect(result).toEqual({
      0: { status: '' },
      1: { status: 'absent' },
      2: { status: 'absent' },
      3: { status: '' },
      4: { status: '' },
      5: { status: '' },
      6: { status: '' },
      7: { status: 'absent' },
      8: { status: '' },
      9: { status: 'absent' },
      '+': { status: 'absent' },
      '-': { status: '' },
      '*': { status: '' },
      '/': { status: 'absent' },
    });
  });
});
