/**
 * Generates the Fibonacci sequence using an iterative approach.
 *
 * @param {number} n - The number of Fibonacci numbers to generate.
 * @returns {number[]} The Fibonacci sequence.
 */
function fibonacciSequence(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];
  while (sequence.length < n) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2],
    );
  }
  return sequence;
}

module.exports = { fibonacciSequence };
