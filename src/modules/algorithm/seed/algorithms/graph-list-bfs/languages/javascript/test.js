const { bfs } = require('./exercise');

describe('Breadth-First Search (BFS) Algorithm', () => {
  describe('Basic Functionality', () => {
    it('should traverse a simple graph correctly', () => {
      const graph = {
        A: ['B', 'C'],
        B: ['D', 'E'],
        C: ['F'],
        D: [],
        E: [],
        F: [],
      };
      expect(bfs(graph, 'A')).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });

    it('should handle numeric vertex identifiers', () => {
      const graph = {
        0: [1, 2],
        1: [0, 3, 4],
        2: [0, 4],
        3: [1],
        4: [1, 2],
      };
      expect(bfs(graph, 0)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle a graph with a single vertex', () => {
      const graph = {
        A: [],
      };
      expect(bfs(graph, 'A')).toEqual(['A']);
    });

    it('should handle a disconnected graph', () => {
      const graph = {
        A: ['B'],
        B: ['A'],
        C: ['D'],
        D: ['C'],
      };
      expect(bfs(graph, 'A')).toEqual(['A', 'B']);
    });

    it('should handle a cyclic graph', () => {
      const graph = {
        A: ['B', 'C'],
        B: ['A', 'D'],
        C: ['A', 'D'],
        D: ['B', 'C'],
      };
      expect(bfs(graph, 'A')).toEqual(['A', 'B', 'C', 'D']);
    });
  });

  describe('Complex Graphs', () => {
    it('should handle a larger graph', () => {
      const graph = {
        A: ['B', 'C', 'D'],
        B: ['A', 'E', 'F'],
        C: ['A', 'G', 'H'],
        D: ['A', 'I', 'J'],
        E: ['B', 'K'],
        F: ['B'],
        G: ['C'],
        H: ['C'],
        I: ['D'],
        J: ['D'],
        K: ['E'],
      };
      const result = bfs(graph, 'A');
      // Check first level neighbors are visited first
      expect(result.slice(0, 4)).toEqual(['A', 'B', 'C', 'D']);
      // Check all vertices are visited
      expect([...result].sort()).toEqual(
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].sort(),
      );
      // Check result length
      expect(result.length).toBe(11);
    });
  });
});
