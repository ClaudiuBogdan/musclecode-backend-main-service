package fibonaccisequence

// FibonacciSequenceRecursive generates the Fibonacci sequence using a recursive approach.
// It returns a slice containing the first n Fibonacci numbers.
func FibonacciSequenceRecursive(n int) []int {
    if n <= 0 {
        return []int{}
    }
    if n == 1 {
        return []int{0}
    }
    if n == 2 {
        return []int{0, 1}
    }
    sequence := FibonacciSequenceRecursive(n - 1)
    sequence = append(sequence, sequence[len(sequence)-1]+sequence[len(sequence)-2])
    return sequence
} 