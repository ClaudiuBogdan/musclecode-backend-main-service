import { bfsMatrix } from './exercise';

describe('BFS Matrix Algorithm', () => {
  it('should traverse a simple graph', () => {
    const graph = [
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
    ];
    const startVertex = 0;
    const expected = [0, 1, 3, 2, 4];
    expect(bfsMatrix(graph, startVertex)).toEqual(expected);
  });

  it('should handle a disconnected graph', () => {
    const graph = [
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
    ];
    const startVertex = 0;
    const expected = [0, 1];
    expect(bfsMatrix(graph, startVertex)).toEqual(expected);
  });

  it('should handle a single-node graph', () => {
    const graph = [[0]];
    const startVertex = 0;
    const expected = [0];
    expect(bfsMatrix(graph, startVertex)).toEqual(expected);
  });

  it('should handle an empty graph', () => {
    const graph: number[][] = [];
    const startVertex = 0;
    const expected: number[] = [];
    expect(bfsMatrix(graph, startVertex)).toEqual(expected);
  });

  it('should handle a larger, more complex graph', () => {
    const graph = [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
    ];
    const startVertex = 0;
    const expected = [0, 1, 2, 3, 4, 5, 6];
    expect(bfsMatrix(graph, startVertex)).toEqual(expected);
  });

  it('should handle starting from a different vertex', () => {
    const graph = [
      [0, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
    ];
    const startVertex = 3;
    const expected = [3, 1, 4];
    expect(bfsMatrix(graph, startVertex)).toEqual(expected);
  });
});
