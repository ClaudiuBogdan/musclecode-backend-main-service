package knapsackfractional

import "testing"

func TestFractionalKnapsackBasicFunctionality(t *testing.T) {
	tests := []struct {
		name     string
		weights  []float64
		values   []float64
		capacity float64
		expected float64
	}{
		{
			name:     "basic test case",
			weights:  []float64{10, 20, 30},
			values:   []float64{60, 100, 120},
			capacity: 50,
			expected: 240,
		},
		{
			name:     "another test case",
			weights:  []float64{3, 3, 2, 5, 1},
			values:   []float64{10, 15, 10, 12, 8},
			capacity: 10,
			expected: 43,
		},
		{
			name:     "capacity smaller than any weight",
			weights:  []float64{10, 20, 30},
			values:   []float64{60, 100, 120},
			capacity: 5,
			expected: 30,
		},
		{
			name:     "all items can be taken",
			weights:  []float64{10, 20, 30},
			values:   []float64{60, 100, 120},
			capacity: 100,
			expected: 280,
		},
		{
			name:     "empty input arrays",
			weights:  []float64{},
			values:   []float64{},
			capacity: 50,
			expected: 0,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := FractionalKnapsack(tt.weights, tt.values, tt.capacity); got != tt.expected {
				t.Errorf("FractionalKnapsack(%v, %v, %v) = %v, want %v", tt.weights, tt.values, tt.capacity, got, tt.expected)
			}
		})
	}
} 