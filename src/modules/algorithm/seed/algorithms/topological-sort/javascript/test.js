const { topologicalSort } = require('./exercise');

describe('Topological Sort Algorithm', () => {
  it('should return a valid topological ordering for a simple DAG', () => {
    const n = 4;
    const edges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ];
    const result = topologicalSort(n, edges);
    expect(result).toBeDefined();
    expect(result.length).toBe(n);

    // Basic validation of the order (not exhaustive)
    const index = {};
    result.forEach((node, i) => {
      index[node] = i;
    });

    edges.forEach(([u, v]) => {
      expect(index[u]).toBeLessThan(index[v]);
    });
  });

  it('should return a valid topological ordering for a more complex DAG', () => {
    const n = 6;
    const edges = [
      [5, 2],
      [5, 0],
      [4, 0],
      [4, 1],
      [2, 3],
      [3, 1],
    ];
    const result = topologicalSort(n, edges);
    expect(result).toBeDefined();
    expect(result.length).toBe(n);

    // Basic validation of the order (not exhaustive)
    const index = {};
    result.forEach((node, i) => {
      index[node] = i;
    });

    edges.forEach(([u, v]) => {
      expect(index[u]).toBeLessThan(index[v]);
    });
  });

  it('should return an empty array if the graph contains a cycle', () => {
    const n = 3;
    const edges = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];
    const result = topologicalSort(n, edges);
    expect(result).toEqual([]);
  });

  it('should handle a graph with no edges', () => {
    const n = 5;
    const edges = [];
    const result = topologicalSort(n, edges);
    expect(result).toBeDefined();
    expect(result.length).toBe(n);
    expect(result.sort()).toEqual(Array.from({ length: n }, (_, i) => i)); // Should be [0, 1, 2, 3, 4] in any order
  });
});
