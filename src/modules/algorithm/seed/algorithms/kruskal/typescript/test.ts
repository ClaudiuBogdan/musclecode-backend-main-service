import { kruskal } from './exercise';

describe("Kruskal's Algorithm", () => {
  it('should return the minimum spanning tree for a given graph', () => {
    const vertices = 4;
    const edges: Edge[] = [
      [0, 1, 10],
      [0, 2, 6],
      [0, 3, 5],
      [1, 3, 15],
      [2, 3, 4],
    ];
    const expectedMST: Edge[] = [
      [2, 3, 4],
      [0, 3, 5],
      [0, 1, 10],
    ];
    expect(kruskal(vertices, edges)).toEqual(
      expect.arrayContaining(expectedMST),
    );
  });

  it('should handle a graph with 5 vertices', () => {
    const vertices = 5;
    const edges: Edge[] = [
      [0, 1, 2],
      [0, 3, 6],
      [1, 2, 3],
      [1, 3, 8],
      [1, 4, 5],
      [2, 4, 7],
    ];
    const expectedMST: Edge[] = [
      [0, 1, 2],
      [1, 2, 3],
      [1, 4, 5],
      [0, 3, 6],
    ];
    expect(kruskal(vertices, edges)).toEqual(
      expect.arrayContaining(expectedMST),
    );
  });

  it('should return an empty array for a graph with no edges', () => {
    const vertices = 3;
    const edges: Edge[] = [];
    expect(kruskal(vertices, edges)).toEqual([]);
  });

  it('should handle a graph with only one vertex', () => {
    const vertices = 1;
    const edges: Edge[] = [];
    expect(kruskal(vertices, edges)).toEqual([]);
  });
});
