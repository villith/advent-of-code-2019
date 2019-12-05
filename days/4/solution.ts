import assert from 'assert';
import input from './input';

const [MIN, MAX] = input;

let validCount = 0;
let invalidCount = 0;

const isValid = (num: number) => {
  let valid = false;
  const nums = `${num}`.split('');
  if (nums.length !== 6) return valid;
  for (let i = 0; i < nums.length; i += 1) {
    const numOne = nums[i];
    const numTwo = nums[i + 1];
    if (numOne === numTwo && numOne !== nums[i - 1] && numTwo !== nums[i + 2]) {
      valid = true;
    }
    if (numOne > numTwo) {
      valid = false;
      break;
    }
  }
  return valid;
};

for (let i = MIN; i < MAX; i += 1) {
  if (isValid(i)) validCount += 1;
  else {
    invalidCount += 1;
  }
}

assert.strictEqual(isValid(111111), true);
assert.strictEqual(isValid(223450), false);
assert.strictEqual(isValid(123789), false);
assert.strictEqual(validCount + invalidCount, MAX - MIN);
