import { twoSum } from './exercise';

describe('Two Sum', () => {
  it('should return [0, 1] for nums = [2, 7, 11, 15], target = 9', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('should return [1, 2] for nums = [3, 2, 4], target = 6', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it('should return [0, 1] for nums = [3, 3], target = 6', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it('should return undefined for nums = [1, 2, 3], target = 10', () => {
    expect(twoSum([1, 2, 3], 10)).toBeUndefined();
  });
});
