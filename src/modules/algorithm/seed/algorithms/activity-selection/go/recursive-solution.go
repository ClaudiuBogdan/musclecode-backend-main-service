package activityselection

import "sort"

type Activity struct {
	Start int
	End   int
}

// ActivitySelection selects the maximum set of non-overlapping activities using a recursive approach.
func ActivitySelection(activities []Activity) []Activity {
	if len(activities) == 0 {
		return []Activity{}
	}

	// Sort activities by finish time
	sort.Slice(activities, func(i, j int) bool {
		return activities[i].End < activities[j].End
	})

	return recursiveActivitySelection(activities, []Activity{activities[0]}, activities[0], 1)
}

func recursiveActivitySelection(
	activities []Activity,
	selectedActivities []Activity,
	lastActivity Activity,
	index int,
) []Activity {
	if index >= len(activities) {
		return selectedActivities
	}

	if activities[index].Start >= lastActivity.End {
		selectedActivities = append(selectedActivities, activities[index])
		return recursiveActivitySelection(
			activities,
			selectedActivities,
			activities[index],
			index+1,
		)
	}

	return recursiveActivitySelection(activities, selectedActivities, lastActivity, index+1)
} 