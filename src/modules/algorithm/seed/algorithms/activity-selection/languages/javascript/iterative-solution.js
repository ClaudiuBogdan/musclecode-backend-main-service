/**
 * Implements activity selection algorithm using an iterative approach.
 *
 * @param activities - An array of activities
 * @returns The maximum set of non-overlapping activities
 *
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(1)
 */
function activitySelection(activities) {
  if (!activities || activities.length === 0) {
    return [];
  }

  // Sort activities by finish time
  activities.sort((a, b) => a.end - b.end);

  const selectedActivities = [activities[0]];
  let lastActivity = activities[0];

  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastActivity.end) {
      selectedActivities.push(activities[i]);
      lastActivity = activities[i];
    }
  }

  return selectedActivities;
}

module.exports = { activitySelection };
