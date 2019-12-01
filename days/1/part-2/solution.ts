import assert from 'assert';
import input from '../input';

const FUEL_FORMULA = (mass: number) => Math.floor(mass / 3) - 2;

const recursiveFunc = (fuel: number, total = 0): number => {
  const result = FUEL_FORMULA(fuel);
  if (result > 6) {
    return recursiveFunc(result, total + result);
  }
  return total + result;
};

assert.strictEqual(recursiveFunc(14), 2);
assert.strictEqual(recursiveFunc(1969), 966);
assert.strictEqual(recursiveFunc(100756), 50346);

const totalFuelRequired = input.reduce((acc, cv) => {
  let rollingSum = acc;
  const fuel = FUEL_FORMULA(cv);
  rollingSum += recursiveFunc(fuel);
  rollingSum += fuel;
  return rollingSum;
}, 0);

console.log(totalFuelRequired);
// 5069241
