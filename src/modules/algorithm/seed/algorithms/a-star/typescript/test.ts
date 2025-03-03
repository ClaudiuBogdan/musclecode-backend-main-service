import { aStarSearch } from './exercise';

describe('A* Search Algorithm', () => {
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const start1 = [0, 0];
  const goal1 = [4, 4];
  const expected1 = [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
    [3, 2],
    [4, 2],
    [4, 3],
    [4, 4],
  ];

  const grid2 = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ];
  const start2 = [0, 0];
  const goal2 = [2, 0];
  const expected2: number[][] = [];

  it('should find the optimal path (iterative)', () => {
    // You can uncomment below when the exercise is implemented
    // expect(aStarSearch(grid1, start1, goal1)).toEqual(expected1);
    // expect(aStarSearch(grid2, start2, goal2)).toEqual(expected2);
  });
});
