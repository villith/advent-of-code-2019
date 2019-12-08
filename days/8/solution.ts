import assert from 'assert';
import input from './input';

const checkSum = (data: string, width: number, height: number) => {
  const asArray = data.split('');
  const layerSize = width * height;
  let fewestZeroes = Infinity;
  let result = 0;
  for (let i = 0; i < asArray.length; i += layerSize) {
    const layer = asArray.slice(i, i + layerSize);
    const zeroCount = layer.filter(x => x === '0').length;
    if (zeroCount < fewestZeroes) {
      fewestZeroes = zeroCount;
      result = layer.filter(x => x === '1').length * layer.filter(x => x === '2').length;
    }
  }

  return result;
};

const displayImage = (data: string, width: number, height: number) => {
  const asArray = data.split('');
  const layerSize = width * height;
  const result: string[] = new Array(layerSize).fill('');
  for (let i = 0; i < asArray.length; i += layerSize) {
    const layer = asArray.slice(i, i + layerSize);
    layer.forEach((x, index) => {
      if (!result[index] || result[index] === '2') {
        result[index] = x;
      }
    });
  }
  return result.join('');
}


assert.deepStrictEqual(checkSum(input, 25, 6), 1441);
assert.deepStrictEqual(displayImage(input, 25, 6), '111001001011110111001110010010100100001010010100101001010010001001110010010111001001001000100101110010100100101000010010100001001001100111101110010000');