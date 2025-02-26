import { dfs } from './exercise';

describe('Depth-First Search (DFS)', () => {
  test('Example 1: Simple tree-like graph', () => {
    const graph = {
      A: ['B', 'C'],
      B: ['D', 'E'],
      C: [],
      D: [],
      E: [],
    };
    const startVertex = 'A';
    const expected = ['A', 'B', 'D', 'E', 'C'];

    expect(dfs(graph, startVertex)).toEqual(expected);
  });

  test('Example 2: Graph with cycles', () => {
    const graph = {
      '0': ['1', '2'],
      '1': ['0', '3', '4'],
      '2': ['0'],
      '3': ['1'],
      '4': ['1', '5'],
      '5': ['4'],
    };
    const startVertex = '0';
    const expected = ['0', '1', '3', '4', '5', '2'];

    expect(dfs(graph, startVertex)).toEqual(expected);
  });

  test('Small cyclic graph', () => {
    const graph = {
      X: ['Y', 'Z'],
      Y: ['X'],
      Z: ['X'],
    };
    const startVertex = 'X';
    const expected = ['X', 'Y', 'Z'];

    expect(dfs(graph, startVertex)).toEqual(expected);
  });

  test('Larger graph with multiple branches', () => {
    const graph = {
      '1': ['2', '3', '4'],
      '2': ['1', '5', '6'],
      '3': ['1'],
      '4': ['1', '7', '8'],
      '5': ['2'],
      '6': ['2'],
      '7': ['4'],
      '8': ['4'],
    };
    const startVertex = '1';
    const expected = ['1', '2', '5', '6', '3', '4', '7', '8'];

    expect(dfs(graph, startVertex)).toEqual(expected);
  });

  test('Single vertex graph', () => {
    const graph = {
      S: [],
    };
    const startVertex = 'S';
    const expected = ['S'];

    expect(dfs(graph, startVertex)).toEqual(expected);
  });
});
