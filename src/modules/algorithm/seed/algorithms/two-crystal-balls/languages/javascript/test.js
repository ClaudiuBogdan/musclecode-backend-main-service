const { twoCrystalBalls } = require('./exercise');

describe('Two Crystal Balls Algorithm', () => {
  it('should return the correct breaking point', () => {
    const breaks = [false, false, false, true, true, true];
    expect(twoCrystalBalls(breaks)).toBe(3);
  });

  it('should return -1 if the balls never break', () => {
    const breaks = [false, false, false, false, false];
    expect(twoCrystalBalls(breaks)).toBe(-1);
  });

  it('should work with a large array', () => {
    const breaks = Array(1000).fill(false);
    for (let i = 500; i < 1000; i++) {
      breaks[i] = true;
    }
    expect(twoCrystalBalls(breaks)).toBe(500);
  });

  it('should return 0 if the first floor breaks the ball', () => {
    const breaks = [true, true, true];
    expect(twoCrystalBalls(breaks)).toBe(0);
  });
});
