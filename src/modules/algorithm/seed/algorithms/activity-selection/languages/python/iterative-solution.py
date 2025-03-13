from typing import List, Tuple

Activity = Tuple[int, int]  # (start_time, end_time)

def activity_selection(activities: List[Activity]) -> List[Activity]:
    """
    Selects the maximum set of non-overlapping activities using an iterative approach.

    Args:
        activities: A list of activities, where each activity is a tuple of (start_time, end_time).

    Returns:
        A list of selected activities.
    """
    if not activities:
        return []

    # Sort activities by finish time
    activities.sort(key=lambda x: x[1])

    selected_activities = [activities[0]]
    last_activity = activities[0]

    for i in range(1, len(activities)):
        if activities[i][0] >= last_activity[1]:
            selected_activities.append(activities[i])
            last_activity = activities[i]

    return selected_activities 