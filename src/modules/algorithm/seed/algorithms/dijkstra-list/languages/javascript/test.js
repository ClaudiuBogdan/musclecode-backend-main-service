const { dijkstra } = require('./exercise');

describe("Dijkstra's Algorithm", () => {
  describe('Basic Functionality', () => {
    it('should find shortest paths in a simple graph', () => {
      const graph = {
        A: [
          { node: 'B', weight: 2 },
          { node: 'D', weight: 6 },
        ],
        B: [
          { node: 'C', weight: 3 },
          { node: 'D', weight: 7 },
        ],
        C: [{ node: 'E', weight: 5 }],
        D: [
          { node: 'C', weight: 1 },
          { node: 'E', weight: 2 },
        ],
        E: [],
      };

      const result = dijkstra(graph, 'A');

      expect(result).toEqual({
        A: 0,
        B: 2,
        C: 5,
        D: 6,
        E: 8,
      });
    });

    it('should handle alternative paths correctly', () => {
      const graph = {
        A: [
          { node: 'B', weight: 4 },
          { node: 'C', weight: 2 },
        ],
        B: [{ node: 'D', weight: 5 }],
        C: [
          { node: 'B', weight: 1 },
          { node: 'D', weight: 8 },
        ],
        D: [],
      };

      const result = dijkstra(graph, 'A');

      expect(result).toEqual({
        A: 0,
        B: 3,
        C: 2,
        D: 8,
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle a graph with only the source node', () => {
      const graph = {
        A: [],
      };

      const result = dijkstra(graph, 'A');

      expect(result).toEqual({
        A: 0,
      });
    });

    it('should handle disconnected nodes', () => {
      const graph = {
        A: [{ node: 'B', weight: 1 }],
        B: [],
        C: [{ node: 'D', weight: 1 }],
        D: [],
      };

      const result = dijkstra(graph, 'A');

      // C and D are unreachable from A
      expect(result).toEqual({
        A: 0,
        B: 1,
        C: Infinity,
        D: Infinity,
      });
    });
  });

  describe('Complex Graphs', () => {
    it('should handle a more complex graph with multiple paths', () => {
      const graph = {
        A: [
          { node: 'B', weight: 4 },
          { node: 'C', weight: 2 },
        ],
        B: [
          { node: 'C', weight: 1 },
          { node: 'D', weight: 5 },
        ],
        C: [
          { node: 'D', weight: 8 },
          { node: 'E', weight: 10 },
        ],
        D: [{ node: 'E', weight: 2 }],
        E: [{ node: 'A', weight: 7 }],
      };

      const result = dijkstra(graph, 'A');

      expect(result).toEqual({
        A: 0,
        B: 4,
        C: 2,
        D: 9,
        E: 11,
      });
    });
  });
});
