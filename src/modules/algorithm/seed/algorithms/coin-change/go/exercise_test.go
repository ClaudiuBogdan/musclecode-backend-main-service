package coinchange

import "testing"

func TestCoinChangeBasic(t *testing.T) {
    tests := []struct {
        name     string
        coins    []int
        amount   int
        expected int
    }{
        {"example 1", []int{1, 2, 5}, 11, 3},
        {"example 2", []int{2}, 3, -1},
        {"zero amount", []int{1, 2, 5}, 0, 0},
        {"empty coins", []int{}, 10, -1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := CoinChange(tt.coins, tt.amount); got != tt.expected {
                t.Errorf("CoinChange(%v, %v) = %v; want %v", tt.coins, tt.amount, got, tt.expected)
            }
        })
    }
} 