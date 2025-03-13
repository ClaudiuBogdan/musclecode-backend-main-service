package insertionsort

import (
	"reflect"
	"testing"
)

func TestInsertionSort(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{"example1", []int{29, 10, 14, 37, 14}, []int{10, 14, 14, 29, 37}},
		{"example2", []int{6, 2, 10, 7}, []int{2, 6, 7, 10}},
		{"empty", []int{}, []int{}},
		{"single", []int{5}, []int{5}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create a copy of the input as InsertionSort may sort in-place.
			inputCopy := make([]int, len(tt.input))
			copy(inputCopy, tt.input)
			got := InsertionSort(inputCopy)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("InsertionSort(%v) = %v; want %v", tt.input, got, tt.expected)
			}
		})
	}
} 