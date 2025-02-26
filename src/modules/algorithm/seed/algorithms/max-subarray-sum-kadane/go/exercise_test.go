package kadane

import "testing"

func TestMaxSubarraySum(t *testing.T) {
	tests := []struct {
		name     string
		nums     []int
		expected int
	}{
		{
			name:     "basic test",
			nums:     []int{-2, 1, -3, 4, -1, 2, 1, -5, 4},
			expected: 6,
		},
		{
			name:     "all positive",
			nums:     []int{5, 4, -1, 7, 8},
			expected: 23,
		},
		{
			name:     "all negative",
			nums:     []int{-1, -2, -3},
			expected: -1,
		},
		{
			name:     "empty array",
			nums:     []int{},
			expected: 0,
		},
		{
			name:     "single element",
			nums:     []int{5},
			expected: 5,
		},
		{
			name:     "single negative element",
			nums:     []int{-5},
			expected: -5,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := MaxSubarraySum(tt.nums)
			if result != tt.expected {
				t.Errorf("MaxSubarraySum(%v) = %v, expected %v", tt.nums, result, tt.expected)
			}
		})
	}
} 