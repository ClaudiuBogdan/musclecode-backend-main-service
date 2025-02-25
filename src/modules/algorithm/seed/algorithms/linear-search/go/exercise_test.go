package linearsearch

import "testing"

func TestLinearSearchBasicFunctionality(t *testing.T) {
    tests := []struct {
        name     string
        nums     []int
        target   int
        expected int
    }{
        {"find element in the middle", []int{13, 9, 21, 15, 39, 19, 27}, 21, 2},
        {"element not found", []int{13, 9, 21, 15, 39, 19, 27}, 99, -1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := LinearSearch(tt.nums, tt.target); got != tt.expected {
                t.Errorf("LinearSearch(%v, %v) = %v; want %v", tt.nums, tt.target, got, tt.expected)
            }
        })
    }
}

func TestLinearSearchEdgeCases(t *testing.T) {
    tests := []struct {
        name     string
        nums     []int
        target   int
        expected int
    }{
        {"empty array", []int{}, 10, -1},
        {"single element - found", []int{5}, 5, 0},
        {"single element - not found", []int{5}, 3, -1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := LinearSearch(tt.nums, tt.target); got != tt.expected {
                t.Errorf("LinearSearch(%v, %v) = %v; want %v", tt.nums, tt.target, got, tt.expected)
            }
        })
    }
}

func TestLinearSearchLargeArray(t *testing.T) {
    largeArray := make([]int, 1000)
    for i := 0; i < 1000; i++ {
        largeArray[i] = i
    }
    if got := LinearSearch(largeArray, 500); got != 500 {
        t.Errorf("LinearSearch(largeArray, 500) = %v; want %v", got, 500)
    }
} 