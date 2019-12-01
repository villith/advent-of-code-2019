import input from '../input';

const FUEL_FORMULA = (mass: number) => Math.floor(mass / 3) - 2;

const totalFuelRequired = input.reduce((acc, cv) => {
  let rollingSum = acc;
  rollingSum += FUEL_FORMULA(cv);
  return rollingSum;
}, 0);

console.log(totalFuelRequired);
