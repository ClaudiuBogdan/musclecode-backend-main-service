package fibonaccisequence

// FibonacciSequenceIterative generates the Fibonacci sequence using an iterative approach.
// It returns a slice containing the first n Fibonacci numbers.
func FibonacciSequenceIterative(n int) []int {
    if n <= 0 {
        return []int{}
    }
    if n == 1 {
        return []int{0}
    }
    sequence := []int{0, 1}
    for len(sequence) < n {
        sequence = append(sequence, sequence[len(sequence)-1]+sequence[len(sequence)-2])
    }
    return sequence
} 