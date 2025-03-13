/**
 * Generates the Fibonacci sequence using a recursive approach.
 *
 * @param n - The number of Fibonacci numbers to generate.
 * @returns An array of Fibonacci numbers.
 */
export function fibonacciSequence(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = fibonacciSequence(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  return sequence;
}
