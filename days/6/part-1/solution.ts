import assert from 'assert';
import input from '../input';

export type Graph = Record<string, {
  descendants: string[],
  neighbours: string[],
}>;

const buildGraph = (data: string[]) => {
  const graph: Graph = {};
  data.forEach((a) => {
    const [left, right] = a.split(')');
    if ({}.hasOwnProperty.call(graph, left)) {
      graph[left].descendants.push(right);
      graph[left].neighbours.push(right);
    } else {
      graph[left] = {
        descendants: [right],
        neighbours: [right]
      }
    }
    if ({}.hasOwnProperty.call(graph, right)) {
      graph[right].neighbours.push(left);
    } else {
      graph[right] = {
        descendants: [],
        neighbours: [left]
      }
    }
  });
  return graph;
};

const getNumOrbits = (graph: Graph) => {
  const result = Object.keys(graph).reduce((acc, k) => {
    let totalOrbits = acc;
    const recursiveFunc = (key: string) => {
      const val = graph[key];
      if (val?.descendants?.length) {
        totalOrbits += val.descendants.length;
        val.descendants.forEach(recursiveFunc);
      }
    };
    recursiveFunc(k);
    return totalOrbits;
  }, 0);
  return result;
};

const testData = [
  'B)G',
  'G)H',
  'D)I',
  'E)J',
  'J)K',
  'K)L',
  'COM)B',
  'B)C',
  'C)D',
  'D)E',
  'E)F',
];
const testDataTwo = [
  'COM)B',
  'B)C',
  'C)D',
  'D)E',
  'E)F',
  'B)G',
  'G)H',
  'D)I',
  'E)J',
  'J)K',
  'K)L',
];

assert.strictEqual(getNumOrbits(buildGraph(testDataTwo)), 42);
assert.strictEqual(getNumOrbits(buildGraph(testData)), 42);
assert.strictEqual(getNumOrbits(buildGraph(input)), 151345);

export default buildGraph;