package quicksort

import (
	"reflect"
	"testing"
)

func TestQuickSortBasicFunctionality(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{
			name:     "example 1",
			input:    []int{20, 13, 3, 2, 10, 1, 5, 6},
			expected: []int{1, 2, 3, 5, 6, 10, 13, 20},
		},
		{
			name:     "example 2",
			input:    []int{64, 34, 25, 12, 22, 11, 90, 5},
			expected: []int{5, 11, 12, 22, 25, 34, 64, 90},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := QuickSort(tt.input); !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("QuickSort(%v) = %v; want %v", tt.input, got, tt.expected)
			}
		})
	}
}

func TestQuickSortEdgeCases(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{"empty array", []int{}, []int{}},
		{"single element", []int{42}, []int{42}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := QuickSort(tt.input); !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("QuickSort(%v) = %v; want %v", tt.input, got, tt.expected)
			}
		})
	}
}

func TestQuickSortIterative(t *testing.T) {
	input := []int{3, 6, 8, 10, 1, 2, 1}
	expected := []int{1, 1, 2, 3, 6, 8, 10}
	if got := QuickSortIterative(input); !reflect.DeepEqual(got, expected) {
		t.Errorf("QuickSortIterative(%v) = %v; want %v", input, got, expected)
	}
}

func TestQuickSortRecursive(t *testing.T) {
	input := []int{3, 6, 8, 10, 1, 2, 1}
	expected := []int{1, 1, 2, 3, 6, 8, 10}
	if got := QuickSortRecursive(input); !reflect.DeepEqual(got, expected) {
		t.Errorf("QuickSortRecursive(%v) = %v; want %v", input, got, expected)
	}
} 