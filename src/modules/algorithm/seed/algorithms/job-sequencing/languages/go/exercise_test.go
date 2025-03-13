package jobsequencing

import (
	"reflect"
	"testing"
)

func TestJobSequencing(t *testing.T) {
	testCases := []struct {
		name     string
		jobs     []Job
		expected []string
	}{
		{
			name: "Optimal sequence",
			jobs: []Job{
				{ID: "J1", Profit: 85, Deadline: 5},
				{ID: "J2", Profit: 25, Deadline: 4},
				{ID: "J3", Profit: 16, Deadline: 3},
				{ID: "J4", Profit: 40, Deadline: 3},
			},
			expected: []string{"J1", "J4", "J3"},
		},
		{
			name: "Another sequence",
			jobs: []Job{
				{ID: "a", Profit: 100, Deadline: 2},
				{ID: "b", Profit: 20, Deadline: 2},
				{ID: "c", Profit: 40, Deadline: 1},
				{ID: "d", Profit: 35, Deadline: 3},
			},
			expected: []string{"c", "a", "d"},
		},
		{
			name:     "Empty list",
			jobs:     []Job{},
			expected: []string{},
		},
		{
			name: "Same deadlines",
			jobs: []Job{
				{ID: "a", Profit: 10, Deadline: 1},
				{ID: "b", Profit: 15, Deadline: 1},
			},
			expected: []string{"b"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			result := JobSequencing(tc.jobs)
			if !reflect.DeepEqual(result, tc.expected) {
				t.Errorf("JobSequencing(%v) = %v, expected %v", tc.jobs, result, tc.expected)
			}
		})
	}
} 