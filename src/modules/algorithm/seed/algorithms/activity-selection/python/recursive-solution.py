from typing import List, Tuple

Activity = Tuple[int, int]  # (start_time, end_time)

def activity_selection(activities: List[Activity]) -> List[Activity]:
    """
    Selects the maximum set of non-overlapping activities using a recursive approach.

    Args:
        activities: A list of activities, where each activity is a tuple of (start_time, end_time).

    Returns:
        A list of selected activities.
    """
    if not activities:
        return []

    # Sort activities by finish time
    activities.sort(key=lambda x: x[1])

    return _recursive_activity_selection(activities, [activities[0]], activities[0], 1)

def _recursive_activity_selection(
    activities: List[Activity],
    selected_activities: List[Activity],
    last_activity: Activity,
    index: int,
) -> List[Activity]:
    if index >= len(activities):
        return selected_activities

    if activities[index][0] >= last_activity[1]:
        selected_activities.append(activities[index])
        return _recursive_activity_selection(
            activities, selected_activities, activities[index], index + 1
        )

    return _recursive_activity_selection(activities, selected_activities, last_activity, index + 1) 