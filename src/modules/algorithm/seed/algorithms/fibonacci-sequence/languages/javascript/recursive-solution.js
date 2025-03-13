/**
 * Generates the Fibonacci sequence using a recursive approach.
 *
 * @param {number} n - The number of Fibonacci numbers to generate.
 * @returns {number[]} The Fibonacci sequence.
 */
function fibonacciSequence(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = fibonacciSequence(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  return sequence;
}

module.exports = { fibonacciSequence };
