package maxsubarray

import "testing"

func TestMaxSubarraySum(t *testing.T) {
	testCases := []struct {
		name     string
		nums     []int
		k        int
		expected int
	}{
		{
			name:     "basic test",
			nums:     []int{2, 1, 5, 1, 3, 2},
			k:        3,
			expected: 9,
		},
		{
			name:     "another basic test",
			nums:     []int{5, 6, 1, 2, 6, 6, 4, 3},
			k:        3,
			expected: 16,
		},
		{
			name:     "k is larger than array length",
			nums:     []int{1, 2, 3},
			k:        4,
			expected: 0, // Or you could return an error value
		},
		{
			name:     "k is 1",
			nums:     []int{1, 2, 3, 4, 5},
			k:        1,
			expected: 5,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			result := MaxSubarraySum(tc.nums, tc.k)
			if result != tc.expected {
				t.Errorf("Expected %d, got %d", tc.expected, result)
			}
		})
	}
} 