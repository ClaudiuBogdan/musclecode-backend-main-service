/**
 * Generates the Fibonacci sequence using an iterative approach.
 *
 * @param n - The number of Fibonacci numbers to generate.
 * @returns An array of Fibonacci numbers.
 */
export function fibonacciSequence(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence: number[] = [0, 1];
  while (sequence.length < n) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2],
    );
  }
  return sequence;
}
