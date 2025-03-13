import { articulationPoints } from './exercise';
import { articulationPointsIterative } from './iterative-solution';
import { articulationPointsRecursive } from './recursive-solution';

describe('Articulation Points Algorithm', () => {
  // Graph Example 1:
  // Graph with edges: (0,1), (1,2), (2,0), (1,3)
  // Adjacency list:
  //   0: [1,2]
  //   1: [0,2,3]
  //   2: [0,1]
  //   3: [1]
  const graph1 = [
    [1, 2],
    [0, 2, 3],
    [0, 1],
    [1]
  ];
  // Expected articulation point: [1]

  // Graph Example 2:
  // Graph with edges: (0,1), (1,2), (2,3), (3,0)
  // Adjacency list:
  //   0: [1,3]
  //   1: [0,2]
  //   2: [1,3]
  //   3: [2,0]
  const graph2 = [
    [1, 3],
    [0, 2],
    [1, 3],
    [2, 0]
  ];
  // Expected articulation points: []

  const implementations = {
    'Exercise (stub)': articulationPoints,
    'Iterative': articulationPointsIterative,
    'Recursive': articulationPointsRecursive,
  };

  for (const [name, func] of Object.entries(implementations)) {
    describe(`${name} Implementation`, () => {
      it('should identify articulation points for graph1', () => {
        const result = func(graph1).sort((a, b) => a - b);
        expect(result).toEqual([1]);
      });

      it('should identify no articulation points for graph2', () => {
        const result = func(graph2).sort((a, b) => a - b);
        expect(result).toEqual([]);
      });
    });
  }
}); 