import assert from 'assert';
import input from '../input';

type DIRECTIONS = 'R' | 'D' | 'U' | 'L';

const STARTING_COORDS = [0, 0];

const getClosestIntersection = (data: string[]) => {
  const [pathOne, pathTwo] = data.map(path => path.split(','));

  let shortestDistance = 99999999999999;
  let shortestSteps = 99999999999999;
  const stepCounts: Record<number, number> = {};

  const operations: Record<DIRECTIONS, [number, number]> = {
    R: [1, 0],
    D: [0, -1],
    U: [0, 1],
    L: [-1, 0],
  };

  const coordMap: Record<string, number> = {};

  const setCoords = ([x, y]: number[], index: number) => {
    const key = `${x} ${y}`;
    if (!index) coordMap[key] = stepCounts[index];
    else if (key !== '0 0' && {}.hasOwnProperty.call(coordMap, key)) {
      const distance = Math.abs(x) + Math.abs(y);
      if (distance < shortestDistance) {
        shortestDistance = distance;
      }
      if (coordMap[key] + stepCounts[index] < shortestSteps) {
        shortestSteps = coordMap[key] + stepCounts[index];
      }
    }
  };

  const buildCoords = (path: string[], index: number) => {
    const currentPosition = [...STARTING_COORDS];
    const len = path.length;
    stepCounts[index] = 0;
    for (let i = 0; i < len; i += 1) {
      const action = path[i][0] as DIRECTIONS;
      const distance = parseInt(path[i].slice(1), 10);
      const indexToUpdate = operations[action][0] ? 0 : 1;
      const direction = operations[action][indexToUpdate];
      for (let j = 0; j < distance; j += 1) {
        const increment = direction * j;
        const coords = indexToUpdate
          ? [currentPosition[0], currentPosition[1] + increment]
          : [currentPosition[0] + increment, currentPosition[1]];
        setCoords(coords, index);
        stepCounts[index] += 1;
      }
      currentPosition[indexToUpdate] += direction * distance;
    }
  };

  [pathOne, pathTwo].forEach((path, index) => buildCoords(path, index));

  return [shortestDistance, shortestSteps];
};

const testOne = [
  'R75,D30,R83,U83,L12,D49,R71,U7,L72',
  'U62,R66,U55,R34,D71,R55,D58,R83',
];

const testTwo = [
  'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
  'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
];

const testThree = ['R8,U5,L5,D3', 'U7,R6,D4,L4'];

assert.strictEqual(getClosestIntersection(testOne)[0], 159);
assert.strictEqual(getClosestIntersection(testTwo)[0], 135);
assert.strictEqual(getClosestIntersection(testThree)[0], 6);
assert.strictEqual(getClosestIntersection(input)[0], 245);

assert.strictEqual(getClosestIntersection(testOne)[1], 610);
assert.strictEqual(getClosestIntersection(testTwo)[1], 410);
assert.strictEqual(getClosestIntersection(input)[1], 48262);
