import buildGraph, { Graph } from '../part-1/solution';

import assert from 'assert';
import input from '../input';

const getOrbitalTransfers = (a: string, b: string, graph: Graph) => {
  const startingNode = graph[a];
  const targetNode = graph[b];

  let shortestDistance = Infinity;
  const currentKey = startingNode.neighbours[0];

  const recursiveFunc = (key: string, previousKey: string, totalDistance = 0) => {
    let distance = totalDistance;
    distance += 1;
    if (targetNode.neighbours.includes(key) && distance < shortestDistance) shortestDistance = distance;
    const node = graph[key];
    if (node?.neighbours?.length) {
      const otherNeighbours = node.neighbours.filter(k => k !== previousKey);
      otherNeighbours.forEach(k => recursiveFunc(k, key, distance));
    }
  };

  recursiveFunc(currentKey, '');

  return shortestDistance - 1;
};

const testData = [
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
  'K)YOU',
  'I)SAN',
];

assert.strictEqual(getOrbitalTransfers('YOU', 'SAN', buildGraph(testData)), 4);
assert.strictEqual(getOrbitalTransfers('YOU', 'SAN', buildGraph(input)), 391);