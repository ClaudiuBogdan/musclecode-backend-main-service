package fibonaccisequence

import (
	"reflect"
	"testing"
)

func TestFibonacciSequence(t *testing.T) {
	tests := []struct {
		name     string
		n        int
		expected []int
	}{
		{"n=7", 7, []int{0, 1, 1, 2, 3, 5, 8}},
		{"n=10", 10, []int{0, 1, 1, 2, 3, 5, 8, 13, 21, 34}},
		{"n=0", 0, []int{}},
		{"n=-5", -5, []int{}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			res := FibonacciSequence(tt.n)
			if !reflect.DeepEqual(res, tt.expected) {
				t.Errorf("FibonacciSequence(%d) = %v; want %v", tt.n, res, tt.expected)
			}
		})
	}
} 