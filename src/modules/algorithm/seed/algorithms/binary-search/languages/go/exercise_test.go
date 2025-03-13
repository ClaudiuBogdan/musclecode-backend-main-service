package binarysearch

import (
	"testing"
)

func TestBinarySearchBasicFunctionality(t *testing.T) {
    tests := []struct {
        name     string
        nums     []int
        target   int
        expected int
    }{
        {"find element in middle", []int{-1, 0, 2, 4, 6, 8}, 4, 3},
        {"find element at beginning", []int{-1, 0, 2, 4, 6, 8}, -1, 0},
        {"find element at end", []int{-1, 0, 2, 4, 6, 8}, 8, 5},
        {"element not found", []int{-1, 0, 2, 4, 6, 8}, 3, -1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := BinarySearchExercise(tt.nums, tt.target); got != tt.expected {
                t.Errorf("BinarySearchExercise(%v, %v) = %v, want %v", tt.nums, tt.target, got, tt.expected)
            }
        })
    }
}

func TestBinarySearchEdgeCases(t *testing.T) {
    tests := []struct {
        name     string
        nums     []int
        target   int
        expected int
    }{
        {"empty array", []int{}, 1, -1},
        {"single element - found", []int{1}, 1, 0},
        {"single element - not found", []int{1}, 2, -1},
        {"two elements - found first", []int{1, 2}, 1, 0},
        {"two elements - found second", []int{1, 2}, 2, 1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := BinarySearchExercise(tt.nums, tt.target); got != tt.expected {
                t.Errorf("BinarySearchExercise(%v, %v) = %v, want %v", tt.nums, tt.target, got, tt.expected)
            }
        })
    }
}

func TestBinarySearchLargeNumbersAndBoundaries(t *testing.T) {
    tests := []struct {
        name     string
        nums     []int
        target   int
        expected int
    }{
        {"large numbers", []int{1000000, 2000000, 3000000}, 2000000, 1},
        {"negative numbers", []int{-5000, -3000, -1000, 0, 1000}, -3000, 1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := BinarySearchExercise(tt.nums, tt.target); got != tt.expected {
                t.Errorf("BinarySearchExercise(%v, %v) = %v, want %v", tt.nums, tt.target, got, tt.expected)
            }
        })
    }
}

func TestBinarySearchAdditionalCoverage(t *testing.T) {
    tests := []struct {
        name     string
        nums     []int
        target   int
        expected int
    }{
        {"even-length array", []int{1, 3, 5, 7, 9, 11}, 7, 3},
        {"odd-length array", []int{1, 3, 5, 7, 9}, 3, 1},
        {"find in left half", []int{1, 2, 3, 4, 5}, 2, 1},
        {"find in right half", []int{1, 2, 3, 4, 5}, 4, 3},
        {"negative numbers", []int{-10, -5, 0, 5, 10}, -5, 1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := BinarySearchExercise(tt.nums, tt.target); got != tt.expected {
                t.Errorf("BinarySearchExercise(%v, %v) = %v, want %v", tt.nums, tt.target, got, tt.expected)
            }
        })
    }
}

func TestBinarySearchLargeArray(t *testing.T) {
    // Create a large array
    largeArray := make([]int, 1000000)
    for i := range largeArray {
        largeArray[i] = i
    }

    if got := BinarySearchExercise(largeArray, 999999); got != 999999 {
        t.Errorf("BinarySearchExercise(largeArray, 999999) = %v, want 999999", got)
    }
} 