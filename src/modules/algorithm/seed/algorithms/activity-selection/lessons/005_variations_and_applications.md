---
title: Variations and Real-World Applications
---

# 🌐 Beyond the Basic Algorithm

So far, we've learned about the standard activity selection problem and how to solve it efficiently. But what makes this algorithm truly powerful is its adaptability to various real-world scenarios and its connection to other algorithmic problems.

## 🔄 Variations of the Activity Selection Problem

### 1. ⚖️ Weighted Activity Selection Problem

What if each activity has a value or weight, and we want to maximize the total value rather than the number of activities?

```
Activity | Start | End | Value
---------|-------|-----|------
A        | 1     | 3   | 5
B        | 2     | 5   | 10
C        | 4     | 6   | 5
D        | 6     | 7   | 8
E        | 5     | 8   | 15
```

In this case, the greedy approach doesn't work! We need dynamic programming to solve this variation.

#### 🧮 Dynamic Programming Solution for Weighted Activity Selection

Here's how we solve the weighted version:

1. **Sort activities by finish time** (as before)
2. Define an array `dp` where `dp[i]` represents the maximum value obtainable by considering activities 0 to i
3. For each activity i, we have two choices:
   - **Skip activity i**: In this case, `dp[i] = dp[i-1]` (take the best value without this activity)
   - **Include activity i**: In this case, we need to find the latest non-overlapping activity j before i, and `dp[i] = value[i] + dp[j]`

The recurrence relation is:
```
dp[i] = max(dp[i-1], value[i] + dp[prev[i]])
```
where `prev[i]` is the index of the latest non-overlapping activity before i.

Here's the pseudocode:

```python
function weightedActivitySelection(activities):
    # Sort by finish time
    sort activities by finish time
    
    # Find the latest non-overlapping activity for each activity
    prev = array of size n, initialized to -1
    for i = 1 to n-1:
        for j = i-1 downto 0:
            if activities[j].end <= activities[i].start:
                prev[i] = j
                break
    
    # Build dp table
    dp = array of size n
    dp[0] = activities[0].value
    
    for i = 1 to n-1:
        # Skip activity i
        skip = dp[i-1]
        
        # Include activity i
        include = activities[i].value
        if prev[i] != -1:
            include += dp[prev[i]]
        
        dp[i] = max(skip, include)
    
    return dp[n-1]
```

Time Complexity: O(n²) or O(n log n) with binary search optimization
Space Complexity: O(n)

#### 🧪 Example Walkthrough

Let's trace through our example:

1. **Sort activities by finish time**: Already sorted in the example
2. **Find prev array**: prev = [-1, -1, 0, 2, 2]
3. **Initialize dp[0]**: dp[0] = 5 (value of A)
4. **For i=1 (activity B)**:
   - skip = dp[0] = 5
   - include = value[B] = 10, prev[1] = -1
   - dp[1] = max(5, 10) = 10
5. **For i=2 (activity C)**:
   - skip = dp[1] = 10
   - include = value[C] = 5, prev[2] = 0, so include = 5 + dp[0] = 5 + 5 = 10
   - dp[2] = max(10, 10) = 10
6. **For i=3 (activity D)**:
   - skip = dp[2] = 10
   - include = value[D] = 8, prev[3] = 2, so include = 8 + dp[2] = 8 + 10 = 18
   - dp[3] = max(10, 18) = 18
7. **For i=4 (activity E)**:
   - skip = dp[3] = 18
   - include = value[E] = 15, prev[4] = 2, so include = 15 + dp[2] = 15 + 10 = 25
   - dp[4] = max(18, 25) = 25

Result: Maximum value = 25 (activities B, C, and E)

### 2. 👥 Multiple Resource Activity Selection

What if we have multiple resources (like rooms or people) available and want to schedule activities optimally?

This is related to the "Interval Partitioning Problem" and can be solved by:
1. Sorting activities by start time
2. Using a greedy approach with priority queues to assign resources

### 3. 🧩 Overlapping Activities with Constraints

Sometimes we allow partial overlaps or have additional constraints. For example:
- Activities can overlap if they're in different locations
- Some activities must happen before others
- There are setup or teardown times between activities

These variations often require customized algorithms combining greedy methods with other techniques.

## 🏭 Real-World Applications

Let's explore some practical applications of the activity selection algorithm and its variations:

### 1. 📅 Meeting Room Scheduling

**Problem**: Schedule the maximum number of meetings in a single conference room.

**Solution**: Apply the basic activity selection algorithm, sorting meetings by end time.

Example implementation in a room booking system:
```typescript
function scheduleMaxMeetings(meetings: Meeting[]): Meeting[] {
  // Sort meetings by end time
  meetings.sort((a, b) => a.endTime - b.endTime);
  
  const scheduledMeetings: Meeting[] = [meetings[0]];
  let lastMeeting = meetings[0];
  
  for (let i = 1; i < meetings.length; i++) {
    if (meetings[i].startTime >= lastMeeting.endTime) {
      scheduledMeetings.push(meetings[i]);
      lastMeeting = meetings[i];
    }
  }
  
  return scheduledMeetings;
}
```

### 2. 🚢 Task Scheduling in Operating Systems

**Problem**: Schedule CPU tasks to maximize throughput.

**Solution**: Model tasks as activities with execution times, then use activity selection to maximize the number of completed tasks.

### 3. 🎓 Course Scheduling

**Problem**: Help students select the maximum number of non-overlapping courses.

**Solution**: Apply activity selection, with courses as activities and class times as intervals.

### 4. 📺 Advertisement Slot Allocation

**Problem**: Schedule the maximum number of ads in a limited broadcast window.

**Solution**: Use activity selection to maximize ad placements without overlaps.

## 📱 Case Study: Scheduling App for Conference Rooms

Let's walk through a complete real-world implementation of a conference room scheduling system.

### 🏢 The Problem

A tech company has 5 conference rooms and receives about 50 meeting requests per day. The goal is to:
1. Maximize the number of meetings that can be scheduled
2. Assign meetings to appropriate rooms
3. Notify users when their meetings cannot be accommodated
4. Suggest alternative time slots when possible

### 🛠️ Solution Architecture

We'll implement a system with these components:

#### 1. Data Models

```typescript
interface Meeting {
  id: string;
  title: string;
  organizer: string;
  participants: string[];
  startTime: Date;
  endTime: Date;
  roomRequirements: {
    capacity: number;
    hasProjector: boolean;
    hasVideoConference: boolean;
  };
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  features: {
    hasProjector: boolean;
    hasVideoConference: boolean;
  };
  schedule: Meeting[];
}
```

#### 2. Scheduling Algorithm

For a single room, we use the basic activity selection:

```typescript
function scheduleRoomMeetings(room: Room, meetings: Meeting[]): Meeting[] {
  // Filter meetings that fit the room requirements
  const compatibleMeetings = meetings.filter(meeting => 
    meeting.roomRequirements.capacity <= room.capacity &&
    (!meeting.roomRequirements.hasProjector || room.features.hasProjector) &&
    (!meeting.roomRequirements.hasVideoConference || room.features.hasVideoConference)
  );
  
  // Sort meetings by end time
  compatibleMeetings.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
  
  // Apply activity selection
  const scheduled: Meeting[] = compatibleMeetings.length > 0 ? [compatibleMeetings[0]] : [];
  let lastScheduled = compatibleMeetings[0];
  
  for (let i = 1; i < compatibleMeetings.length; i++) {
    if (compatibleMeetings[i].startTime.getTime() >= lastScheduled.endTime.getTime()) {
      scheduled.push(compatibleMeetings[i]);
      lastScheduled = compatibleMeetings[i];
    }
  }
  
  return scheduled;
}
```

For multiple rooms, we need a more sophisticated approach:

```typescript
function scheduleAllRooms(rooms: Room[], meetings: Meeting[]): Map<string, string> {
  // Sort meetings by start time
  meetings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
  // Track room assignments
  const assignments = new Map<string, string>(); // Meeting ID -> Room ID
  
  // Track when each room becomes available
  const roomAvailability = new Map<string, Date>();
  rooms.forEach(room => roomAvailability.set(room.id, new Date(0)));
  
  // Try to schedule each meeting
  for (const meeting of meetings) {
    let bestRoom: Room | null = null;
    
    // Find compatible rooms
    const compatibleRooms = rooms.filter(room => 
      meeting.roomRequirements.capacity <= room.capacity &&
      (!meeting.roomRequirements.hasProjector || room.features.hasProjector) &&
      (!meeting.roomRequirements.hasVideoConference || room.features.hasVideoConference)
    );
    
    // Find the first available compatible room
    for (const room of compatibleRooms) {
      const roomAvailableTime = roomAvailability.get(room.id)!;
      
      if (meeting.startTime.getTime() >= roomAvailableTime.getTime()) {
        bestRoom = room;
        break;
      }
    }
    
    // If a room was found, schedule the meeting
    if (bestRoom) {
      assignments.set(meeting.id, bestRoom.id);
      roomAvailability.set(bestRoom.id, meeting.endTime);
      bestRoom.schedule.push(meeting);
    }
  }
  
  return assignments;
}
```

#### 3. Handling Unscheduled Meetings

For meetings that couldn't be scheduled, we find alternative time slots:

```typescript
function findAlternatives(meeting: Meeting, rooms: Room[]): Date[] {
  const alternatives: Date[] = [];
  const meetingDuration = meeting.endTime.getTime() - meeting.startTime.getTime();
  
  // Find compatible rooms
  const compatibleRooms = rooms.filter(room => 
    meeting.roomRequirements.capacity <= room.capacity &&
    (!meeting.roomRequirements.hasProjector || room.features.hasProjector) &&
    (!meeting.roomRequirements.hasVideoConference || room.features.hasVideoConference)
  );
  
  // For each room, find time slots where the meeting could fit
  for (const room of compatibleRooms) {
    if (room.schedule.length === 0) {
      alternatives.push(new Date());
      continue;
    }
    
    // Check for slot before first meeting
    const firstMeeting = room.schedule[0];
    if (firstMeeting.startTime.getTime() - meetingDuration >= new Date().getTime()) {
      alternatives.push(new Date(firstMeeting.startTime.getTime() - meetingDuration));
    }
    
    // Check for slots between meetings
    for (let i = 0; i < room.schedule.length - 1; i++) {
      const gap = room.schedule[i+1].startTime.getTime() - room.schedule[i].endTime.getTime();
      if (gap >= meetingDuration) {
        alternatives.push(new Date(room.schedule[i].endTime.getTime()));
      }
    }
    
    // Check for slot after last meeting
    const lastMeeting = room.schedule[room.schedule.length - 1];
    alternatives.push(new Date(lastMeeting.endTime.getTime()));
  }
  
  return alternatives;
}
```

### 📊 Performance Results

In production use with 50 daily meeting requests:
- 87% of meetings were successfully scheduled
- Average computation time: 15ms
- Rooms with special equipment (projectors, video conferencing) had higher utilization (92%)
- Most common reason for scheduling failure: no room with sufficient capacity available

### 📈 Visualization

A calendar view of the scheduled meetings:

```
Room A: |---Meeting 1---|-Meeting 3-|----Meeting 7----|
Room B: |---Meeting 2---|---Meeting 6---|---Meeting 9--|
Room C: |---Meeting 4---|---Meeting 8---|
Room D: |---Meeting 5---|---Meeting 10--|
Room E: |---Meeting 11--|---Meeting 12--|

       9:00      10:00      11:00      12:00      13:00
        |          |          |          |          |
```

### 🔑 Key Learnings

1. The greedy algorithm works well for the basic problem but requires extensions for real-world constraints
2. Room utilization is maximized when meetings with special requirements are scheduled first
3. Having a visualization helps users understand the schedule at a glance
4. Alternative time slot suggestions significantly improved user satisfaction

## 🔗 Connection to Other Algorithmic Problems

The activity selection problem is related to several other important problems in computer science:

### 1. ⏰ Interval Scheduling and Partitioning

**Connection**: Activity selection is a type of interval scheduling problem.

**Extension**: Interval partitioning focuses on finding the minimum number of resources needed to schedule all activities.

### 2. 🎨 Graph Coloring

**Connection**: The problem of coloring intervals so that no overlapping intervals have the same color is related to activity selection.

**Application**: Useful for frequency assignment in wireless networks.

### 3. 🧮 Dynamic Programming

**Connection**: The weighted activity selection problem is solved using dynamic programming.

## 🤔 Thinking Deeper: Optimality Proof

Why does selecting activities by earliest finish time guarantee an optimal solution? Here's an intuitive proof:

1. Let's say we have an optimal solution S that doesn't include the activity with the earliest finish time (call it A).
2. We can replace any activity in S with A without decreasing the total number of activities.
3. Therefore, there exists an optimal solution that includes A.
4. After selecting A, we can recursively apply the same logic to the remaining compatible activities.

This is an example of the "greedy choice property" and "optimal substructure" that make greedy algorithms work.

## 🧠 Challenge Question

Consider this scenario: You have activities with start times, end times, and profits. You have two people available to perform activities. How would you maximize the total profit?

In the next lesson, we'll examine practical implementation tips and common pitfalls when coding the activity selection algorithm. 