import { hamiltonianPath } from './exercise';

describe('Hamiltonian Path Algorithm', () => {
  it('should return true for a graph with a Hamiltonian path', () => {
    const graph = [
      [0, 1, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 0, 1],
      [0, 0, 1, 1, 0],
    ];
    expect(hamiltonianPath(graph)).toBe(true);
  });

  it('should return false for a graph without a Hamiltonian path', () => {
    const graph = [
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
    ];
    expect(hamiltonianPath(graph)).toBe(false);
  });

  it('should handle an empty graph', () => {
    const graph: number[][] = [];
    expect(hamiltonianPath(graph)).toBe(false);
  });

  it('should handle a single-node graph', () => {
    const graph = [[0]];
    expect(hamiltonianPath(graph)).toBe(true);
  });
});
