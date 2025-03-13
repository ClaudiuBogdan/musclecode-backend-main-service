package mergesort

import (
	"reflect"
	"testing"
)

func TestMergeSort(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{"example", []int{38, 27, 43, 3, 9, 82, 10}, []int{3, 9, 10, 27, 38, 43, 82}},
		{"empty", []int{}, []int{}},
		{"single", []int{5}, []int{5}},
		{"small unsorted", []int{4, 1, 3, 2}, []int{1, 2, 3, 4}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			output := MergeSort(tt.input)
			if !reflect.DeepEqual(output, tt.expected) {
				t.Errorf("MergeSort(%v) = %v; expected %v", tt.input, output, tt.expected)
			}
		})
	}
} 