package activityselection

import "sort"

type Activity struct {
	Start int
	End   int
}

// ActivitySelection selects the maximum set of non-overlapping activities using an iterative approach.
func ActivitySelection(activities []Activity) []Activity {
	if len(activities) == 0 {
		return []Activity{}
	}

	// Sort activities by finish time
	sort.Slice(activities, func(i, j int) bool {
		return activities[i].End < activities[j].End
	})

	selectedActivities := []Activity{activities[0]}
	lastActivity := activities[0]

	for i := 1; i < len(activities); i++ {
		if activities[i].Start >= lastActivity.End {
			selectedActivities = append(selectedActivities, activities[i])
			lastActivity = activities[i]
		}
	}

	return selectedActivities
} 