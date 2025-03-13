import { primsAlgorithm } from './exercise';

describe("Prim's Algorithm (Adjacency List)", () => {
  it('should return the correct MST weight and edges for a simple graph', () => {
    const graph = {
      0: [
        [1, 4],
        [7, 8],
      ],
      1: [
        [0, 4],
        [2, 8],
        [7, 11],
      ],
      2: [
        [1, 8],
        [3, 7],
        [8, 2],
      ],
      3: [
        [2, 7],
        [4, 9],
        [5, 14],
      ],
      4: [
        [3, 9],
        [5, 10],
      ],
      5: [
        [3, 14],
        [4, 10],
        [6, 2],
      ],
      6: [
        [5, 2],
        [7, 1],
        [8, 6],
      ],
      7: [
        [0, 8],
        [1, 11],
        [6, 1],
        [8, 7],
      ],
      8: [
        [2, 2],
        [6, 6],
        [7, 7],
      ],
    };
    const [weight, edges] = primsAlgorithm(graph);
    expect(weight).toBe(37);
    expect(edges).toEqual(
      expect.arrayContaining([
        [0, 1],
        [0, 7],
        [7, 6],
        [6, 5],
        [5, 4],
        [2, 8],
        [2, 3],
      ]),
    );
    expect(edges.length).toBe(7);
  });

  it('should handle an empty graph', () => {
    const graph = {};
    const [weight, edges] = primsAlgorithm(graph);
    expect(weight).toBe(0);
    expect(edges).toEqual([]);
  });

  it('should handle a graph with a single node', () => {
    const graph = { 0: [] };
    const [weight, edges] = primsAlgorithm(graph);
    expect(weight).toBe(0);
    expect(edges).toEqual([]);
  });
});
