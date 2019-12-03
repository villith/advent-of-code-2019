import assert from 'assert';
import input from '../input';

const transformInput = (data: number[]) => {
  const returnData = [...data];
  for (let i = 0; i < returnData.length - 1; i += 4) {
    const [opCode, xIndex, yIndex, targetIndex] = returnData.slice(i, i + 4);
    const x = returnData[xIndex];
    const y = returnData[yIndex];
    if (opCode === 1) {
      returnData[targetIndex] = x + y;
    } else if (opCode === 2) {
      returnData[targetIndex] = x * y;
    } else if (opCode === 99) {
      break;
    } else {
      console.log(`OP_CODE ${opCode} is invalid.`);
    }
  }
  return returnData;
};

assert.deepStrictEqual(transformInput([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
assert.deepStrictEqual(transformInput([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]);
assert.deepStrictEqual(transformInput([2, 4, 4, 5, 99, 0]), [
  2,
  4,
  4,
  5,
  99,
  9801,
]);
assert.deepStrictEqual(transformInput([1, 1, 1, 4, 99, 5, 6, 0, 99]), [
  30,
  1,
  1,
  4,
  2,
  5,
  6,
  0,
  99,
]);

const customInput = [...input];
customInput[1] = 12;
customInput[2] = 2;

export default transformInput;
