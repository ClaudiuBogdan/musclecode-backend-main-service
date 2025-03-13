/**
 * Given two crystal balls that will break if dropped from high enough distance,
 * determine the exact spot in which they will break in the most optimized way.
 *
 * @param {boolean[]} breaks - An array of booleans representing whether the ball breaks at that floor.
 * @returns {number} - The index where the balls start breaking, or -1 if they never break.
 */
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  i -= jumpAmount;

  for (let j = i; j < breaks.length; ++j) {
    if (breaks[j]) {
      return j;
    }
  }

  return -1;
}

module.exports = { twoCrystalBalls };
