import { findHamiltonianCycle } from './exercise';

describe('Hamiltonian Cycle Algorithm', () => {
  it('should find a Hamiltonian Cycle in a graph', () => {
    const graph = [
      [0, 1, 0, 1, 0],
      [1, 0, 1, 1, 1],
      [0, 1, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ];
    const cycle = findHamiltonianCycle(graph);
    expect(cycle).toEqual([0, 1, 2, 4, 3, 0]);
  });

  it('should return null if no Hamiltonian Cycle exists', () => {
    const graph = [
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ];
    const cycle = findHamiltonianCycle(graph);
    expect(cycle).toBeNull();
  });

  it('should handle a single-node graph', () => {
    const graph = [[0]];
    const cycle = findHamiltonianCycle(graph);
    expect(cycle).toEqual([0, 0]);
  });

  it('should handle a complete graph', () => {
    const graph = [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ];
    const cycle = findHamiltonianCycle(graph);
    expect(cycle).toEqual([0, 1, 2, 0]);
  });
});
