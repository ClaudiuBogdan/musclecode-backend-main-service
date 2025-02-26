package activityselection

import (
	"reflect"
	"testing"
)

func TestActivitySelectionBasicFunctionality(t *testing.T) {
	activities := []Activity{
		{Start: 1, End: 3},
		{Start: 2, End: 5},
		{Start: 4, End: 6},
		{Start: 6, End: 7},
		{Start: 5, End: 9},
		{Start: 8, End: 9},
	}
	expected := []Activity{
		{Start: 1, End: 3},
		{Start: 4, End: 6},
		{Start: 6, End: 7},
		{Start: 8, End: 9},
	}

	result := ActivitySelection(activities)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("ActivitySelection(%v) = %v, want %v", activities, result, expected)
	}
}

func TestActivitySelectionEdgeCases(t *testing.T) {
	// Test case 1: Empty array
	activities1 := []Activity{}
	expected1 := []Activity{}
	result1 := ActivitySelection(activities1)
	if !reflect.DeepEqual(result1, expected1) {
		t.Errorf("ActivitySelection(%v) = %v, want %v", activities1, result1, expected1)
	}

	// Test case 2: Single activity
	activities2 := []Activity{{Start: 1, End: 3}}
	expected2 := []Activity{{Start: 1, End: 3}}
	result2 := ActivitySelection(activities2)
	if !reflect.DeepEqual(result2, expected2) {
		t.Errorf("ActivitySelection(%v) = %v, want %v", activities2, result2, expected2)
	}

	// Test case 3: Activities that are already sorted
	activities3 := []Activity{{Start: 1, End: 2}, {Start: 3, End: 4}, {Start: 5, End: 6}}
	expected3 := []Activity{{Start: 1, End: 2}, {Start: 3, End: 4}, {Start: 5, End: 6}}
	result3 := ActivitySelection(activities3)
	if !reflect.DeepEqual(result3, expected3) {
		t.Errorf("ActivitySelection(%v) = %v, want %v", activities3, result3, expected3)
	}

	// Test case 4: Activities with the same end time
	activities4 := []Activity{{Start: 1, End: 3}, {Start: 0, End: 3}, {Start: 2, End: 3}}
	expected4 := []Activity{{Start: 1, End: 3}}
	result4 := ActivitySelection(activities4)

	if len(result4) != len(expected4) {
		t.Errorf("ActivitySelection(%v) = %v, want %v", activities4, result4, expected4)
	} else {
		found := false
		for _, res := range result4 {
			if reflect.DeepEqual(res, expected4[0]) {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("ActivitySelection(%v) = %v, want %v", activities4, result4, expected4)
		}
	}
} 