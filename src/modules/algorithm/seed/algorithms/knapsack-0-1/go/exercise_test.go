package knapsack

import "testing"

func TestKnapsack01(t *testing.T) {
    tests := []struct {
        name     string
        weights  []int
        values   []int
        capacity int
        expected int
    }{
        {"example 1", []int{2, 3, 4, 5}, []int{3, 4, 5, 6}, 5, 7},
        {"example 2", []int{8, 2, 6, 1}, []int{50, 150, 210, 30}, 10, 390},
        {"empty", []int{}, []int{}, 10, 0},
        {"single item fits", []int{5}, []int{10}, 5, 10},
        {"single item not fit", []int{5}, []int{10}, 4, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Knapsack01(tt.weights, tt.values, tt.capacity); got != tt.expected {
                t.Errorf("Knapsack01(%v, %v, %d) = %d; want %d", tt.weights, tt.values, tt.capacity, got, tt.expected)
            }
        })
    }
} 