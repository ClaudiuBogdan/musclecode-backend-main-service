/**
 * Implements activity selection algorithm using a recursive approach.
 *
 * @param activities - An array of activities
 * @returns The maximum set of non-overlapping activities
 *
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n) due to recursive call stack
 */
function activitySelection(activities) {
  if (!activities || activities.length === 0) {
    return [];
  }

  // Sort activities by finish time
  activities.sort((a, b) => a.end - b.end);

  return recursiveActivitySelection(
    activities,
    [activities[0]],
    activities[0],
    1,
  );
}

function recursiveActivitySelection(
  activities,
  selectedActivities,
  lastActivity,
  index,
) {
  if (index >= activities.length) {
    return selectedActivities;
  }

  if (activities[index].start >= lastActivity.end) {
    selectedActivities.push(activities[index]);
    return recursiveActivitySelection(
      activities,
      selectedActivities,
      activities[index],
      index + 1,
    );
  }

  return recursiveActivitySelection(
    activities,
    selectedActivities,
    lastActivity,
    index + 1,
  );
}

module.exports = { activitySelection };
