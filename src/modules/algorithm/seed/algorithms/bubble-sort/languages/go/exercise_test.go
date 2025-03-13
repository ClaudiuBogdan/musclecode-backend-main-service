package bubblesort

import (
	"reflect"
	"testing"
)

func TestBubbleSort(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{"example1", []int{5, 1, 8, 4, 2}, []int{1, 2, 4, 5, 8}},
		{"example2", []int{29, 10, 14, 37, 14}, []int{10, 14, 14, 29, 37}},
		{"already sorted", []int{1, 2, 3, 4, 5}, []int{1, 2, 3, 4, 5}},
		{"empty array", []int{}, []int{}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BubbleSort(tt.input); !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("BubbleSort(%v) = %v; want %v", tt.input, got, tt.expected)
			}
		})
	}
} 