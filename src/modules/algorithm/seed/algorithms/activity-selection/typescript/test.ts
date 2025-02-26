import { activitySelection } from './exercise';

describe('Activity Selection Algorithm', () => {
  it('should return the maximum set of non-overlapping activities', () => {
    const activities = [
      { start: 1, end: 3 },
      { start: 2, end: 5 },
      { start: 4, end: 6 },
      { start: 6, end: 7 },
      { start: 5, end: 9 },
      { start: 8, end: 9 },
    ];
    const expected = [
      { start: 1, end: 3 },
      { start: 4, end: 6 },
      { start: 6, end: 7 },
      { start: 8, end: 9 },
    ];
    expect(activitySelection(activities)).toEqual(expected);
  });

  it('should handle an empty array', () => {
    expect(activitySelection([])).toEqual([]);
  });

  it('should handle a single activity', () => {
    const activities = [{ start: 1, end: 3 }];
    expect(activitySelection(activities)).toEqual(activities);
  });

  it('should handle activities that are already sorted', () => {
    const activities = [
      { start: 1, end: 2 },
      { start: 3, end: 4 },
      { start: 5, end: 6 },
    ];
    expect(activitySelection(activities)).toEqual(activities);
  });

  it('should handle activities with the same end time', () => {
    const activities = [
      { start: 1, end: 3 },
      { start: 0, end: 3 },
      { start: 2, end: 3 },
    ];
    const expected = [{ start: 1, end: 3 }];
    expect(activitySelection(activities)).toEqual(
      expect.arrayContaining(expected),
    );
  });
});
