import input from '../input';
import transformInput from '../part-1/solution';

const MIN = 0;
const MAX = 99;
const TARGET = 19690720;

const customData = (data: number[], x: number, y: number) => [
  data[0],
  x,
  y,
  ...data.slice(3),
];

for (let i = MIN; i <= MAX; i += 1) {
  for (let j = MIN; j <= MAX; j += 1) {
    const result = transformInput(customData(input, i, j))[0];
    if (result === TARGET) {
      console.log(i, j);
      break;
    }
  }
}
