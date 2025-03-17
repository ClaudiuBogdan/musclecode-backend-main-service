---
title: BFS Practice Problems
---

# BFS Practice Problems

This collection of problems will help you master Breadth-First Search algorithms through hands-on practice. The problems are organized by difficulty level, from easy to hard, and cover both tree and graph BFS applications.

> [!TIP]
> For each problem, try to solve it on your own first before checking the hints or solution. Remember that BFS is particularly useful for problems involving shortest paths, level-by-level processing, or finding nodes at a specific distance.

## Easy Problems

### 1. Binary Tree Level Order Traversal

**Problem:** Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

**Example:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Tree structure:
    3
   / \
  9  20
    /  \
   15   7
```

<details>
<summary>Hint</summary>
Use a queue to perform BFS and keep track of the level boundaries by processing the queue in batches.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}
```

Time Complexity: O(n) where n is the number of nodes  
Space Complexity: O(n) in the worst case
</details>

### 2. Maximum Depth of Binary Tree Using BFS

**Problem:** Given the root of a binary tree, find its maximum depth using BFS. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 3

Tree structure:
    3
   / \
  9  20
    /  \
   15   7
```

<details>
<summary>Hint</summary>
Use BFS level-by-level traversal and count the number of levels.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function maxDepth(root) {
    if (!root) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        depth++;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return depth;
}
```

Time Complexity: O(n) where n is the number of nodes  
Space Complexity: O(n) for the queue, which will contain at most the number of nodes at the widest level
</details>

### 3. Cousins in Binary Tree

**Problem:** In a binary tree, two nodes are cousins if they are at the same depth but have different parents. Given the root of a binary tree and two nodes `x` and `y`, determine if they are cousins.

**Example:**
```
Input: root = [1,2,3,4,null,null,5], x = 4, y = 5
Output: true

Tree structure:
    1
   / \
  2   3
 /     \
4       5
```

<details>
<summary>Hint</summary>
Use BFS to track each node's depth and parent. Two nodes are cousins if they have the same depth but different parents.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function isCousins(root, x, y) {
    if (!root) return false;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        let foundX = false;
        let foundY = false;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // Check if current node's children are x and y (same parent)
            if (node.left && node.right) {
                if ((node.left.val === x && node.right.val === y) || 
                    (node.left.val === y && node.right.val === x)) {
                    return false; // Same parent, not cousins
                }
            }
            
            // Check if current node is x or y
            if (node.val === x) foundX = true;
            if (node.val === y) foundY = true;
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        // If both nodes found at same level, they are cousins
        if (foundX && foundY) return true;
        // If only one found, they are at different levels
        if (foundX || foundY) return false;
    }
    
    return false;
}
```

Time Complexity: O(n) where n is the number of nodes  
Space Complexity: O(n) for the queue
</details>

## Medium Problems

### 4. Binary Tree Right Side View

**Problem:** Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

**Example:**
```
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]

Tree structure:
    1
   / \
  2   3
   \   \
    5   4
```

<details>
<summary>Hint</summary>
Use BFS and for each level, add the last node (rightmost) value to the result.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function rightSideView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // If it's the last node in the level, add to result
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}
```

Time Complexity: O(n) where n is the number of nodes  
Space Complexity: O(n) for the queue
</details>

### 5. Rotting Oranges

**Problem:** You are given an m x n grid where each cell can have one of three values:
- 0 representing an empty cell
- 1 representing a fresh orange
- 2 representing a rotten orange

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

**Example:**
```
Input: grid = [
  [2,1,1],
  [1,1,0],
  [0,1,1]
]
Output: 4
```

<details>
<summary>Hint</summary>
Use BFS starting from all rotten oranges simultaneously. Each level of BFS represents one minute passing.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function orangesRotting(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshOranges = 0;
    
    // Find all rotten oranges and count fresh oranges
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j]);
            } else if (grid[i][j] === 1) {
                freshOranges++;
            }
        }
    }
    
    if (freshOranges === 0) return 0;
    if (queue.length === 0) return -1;
    
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let minutes = 0;
    
    // BFS
    while (queue.length > 0 && freshOranges > 0) {
        minutes++;
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift();
            
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < rows && 
                    newCol >= 0 && newCol < cols && 
                    grid[newRow][newCol] === 1) {
                    grid[newRow][newCol] = 2;
                    freshOranges--;
                    queue.push([newRow, newCol]);
                }
            }
        }
    }
    
    return freshOranges === 0 ? minutes : -1;
}
```

Time Complexity: O(rows × cols) as we potentially need to visit all cells  
Space Complexity: O(rows × cols) for the queue in the worst case
</details>

### 6. Minimum Knight Moves

**Problem:** In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0]. A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Return the minimum number of steps needed to move the knight to the square [x, y]. It is guaranteed the answer exists.

```
Example positions a knight can move to from (0,0):
(-2,-1), (-2,1), (-1,-2), (-1,2), (1,-2), (1,2), (2,-1), (2,1)

Input: x = 5, y = 5
Output: 4
```

<details>
<summary>Hint</summary>
Use BFS to find the shortest path from [0,0] to [x,y]. Due to symmetry, you can focus on one quadrant.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function minKnightMoves(x, y) {
    // Due to symmetry, we can focus on one quadrant
    x = Math.abs(x);
    y = Math.abs(y);
    
    const directions = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
    const queue = [[0, 0, 0]]; // [row, col, steps]
    const visited = new Set(['0,0']);
    
    while (queue.length > 0) {
        const [row, col, steps] = queue.shift();
        
        if (row === x && col === y) {
            return steps;
        }
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            const key = `${newRow},${newCol}`;
            
            // Optimization: stay close to the target
            if (!visited.has(key) && newRow >= -2 && newCol >= -2) {
                visited.add(key);
                queue.push([newRow, newCol, steps + 1]);
            }
        }
    }
    
    return -1; // Should not reach here with valid inputs
}
```

Time Complexity: O(max(|x|, |y|)²) due to the search space  
Space Complexity: O(max(|x|, |y|)²) for the queue and visited set
</details>

## Hard Problems

### 7. Word Ladder

**Problem:** Given two words (`beginWord` and `endWord`), and a dictionary's word list, find the length of shortest transformation sequence from `beginWord` to `endWord`, such that:
1. Only one letter can be changed at a time.
2. Each transformed word must exist in the word list.

**Example:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog", with length 5.
```

<details>
<summary>Hint</summary>
Use BFS to find the shortest path. For each word, try changing each character to find all possible valid transformations.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function ladderLength(beginWord, endWord, wordList) {
    // Create a set for O(1) lookups
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]]; // [word, level]
    const visited = new Set([beginWord]);
    
    while (queue.length > 0) {
        const [word, level] = queue.shift();
        
        if (word === endWord) {
            return level;
        }
        
        // Try changing each character of the word
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // ASCII 'a' to 'z'
                const newChar = String.fromCharCode(c);
                const newWord = word.slice(0, i) + newChar + word.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }
    
    return 0; // No transformation sequence found
}
```

Time Complexity: O(M × N), where M is the length of each word and N is the number of words in the list  
Space Complexity: O(N) for the queue and visited set
</details>

### 8. Sliding Puzzle

**Problem:** Given a 2x3 board, with 5 tiles numbered from 1 to 5 and an empty space represented by 0, the goal is to slide the tiles to form [1,2,3,4,5,0]. Return the minimum number of moves to solve the puzzle, or -1 if it's not possible.

**Example:**
```
Input: board = [[4,1,2],[5,0,3]]
Output: 5
```

<details>
<summary>Hint</summary>
Use BFS to explore all possible board states. Each state is a string representation of the board, and each move involves swapping the empty tile with an adjacent tile.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function slidingPuzzle(board) {
    const target = "123450";
    const rows = 2;
    const cols = 3;
    
    // Flattening the 2D board into a string
    let start = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            start += board[i][j];
        }
    }
    
    // Possible moves from each position (adjacent indices)
    const moves = [
        [1, 3],       // Position 0 can move to 1 or 3
        [0, 2, 4],    // Position 1 can move to 0, 2, or 4
        [1, 5],       // Position 2 can move to 1 or 5
        [0, 4],       // Position 3 can move to 0 or 4
        [1, 3, 5],    // Position 4 can move to 1, 3, or 5
        [2, 4]        // Position 5 can move to 2 or 4
    ];
    
    const queue = [[start, 0]]; // [board state, moves]
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [curr, steps] = queue.shift();
        
        if (curr === target) {
            return steps;
        }
        
        // Find position of '0' (empty space)
        const zeroPos = curr.indexOf('0');
        
        // Try all possible moves
        for (const nextPos of moves[zeroPos]) {
            const nextBoard = swap(curr, zeroPos, nextPos);
            
            if (!visited.has(nextBoard)) {
                visited.add(nextBoard);
                queue.push([nextBoard, steps + 1]);
            }
        }
    }
    
    return -1; // Not solvable
}

function swap(str, i, j) {
    const arr = str.split('');
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr.join('');
}
```

Time Complexity: O(6!), as there are 6! possible board states in the worst case  
Space Complexity: O(6!) for the queue and visited set
</details>

### 9. Shortest Path in a Grid with Obstacles Elimination

**Problem:** Given a grid of size m x n, where:
- 0 represents an empty cell
- 1 represents a cell with an obstacle

You can move up, down, left, or right from and to an empty cell. You can remove at most k obstacles. Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m-1, n-1), or -1 if it's not possible.

**Example:**
```
Input: grid = [
  [0,0,0],
  [1,1,0],
  [0,0,0],
  [0,1,1],
  [0,0,0]
], k = 1
Output: 6
```

<details>
<summary>Hint</summary>
Use BFS where each state includes the current position and the number of obstacles removed so far. Use a 3D visited array to track visited states.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function shortestPath(grid, k) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Special case for small grids
    if (rows === 1 && cols === 1) return 0;
    
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const queue = [[0, 0, k, 0]]; // [row, col, obstacles left, steps]
    const visited = new Set(['0,0,' + k]);
    
    while (queue.length > 0) {
        const [row, col, remainingK, steps] = queue.shift();
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                // If we've reached the destination
                if (newRow === rows - 1 && newCol === cols - 1) {
                    return steps + 1;
                }
                
                // If we encounter an obstacle and can remove it
                if (grid[newRow][newCol] === 1 && remainingK > 0) {
                    const newState = `${newRow},${newCol},${remainingK - 1}`;
                    if (!visited.has(newState)) {
                        visited.add(newState);
                        queue.push([newRow, newCol, remainingK - 1, steps + 1]);
                    }
                }
                // If the cell is empty
                else if (grid[newRow][newCol] === 0) {
                    const newState = `${newRow},${newCol},${remainingK}`;
                    if (!visited.has(newState)) {
                        visited.add(newState);
                        queue.push([newRow, newCol, remainingK, steps + 1]);
                    }
                }
            }
        }
    }
    
    return -1; // Destination not reachable
}
```

Time Complexity: O(m × n × k), where m×n is the grid size and k is the number of obstacles that can be eliminated  
Space Complexity: O(m × n × k) for the queue and visited set
</details>

### 10. Minimum Genetic Mutation

**Problem:** A gene string can be represented by an 8-character long string, with choices from "A", "C", "G", "T". Given a start gene string, an end gene string, and a bank of valid gene mutations, determine the minimum number of mutations needed to mutate from start to end. If there is no such mutation, return -1.

A mutation is valid if:
1. One character in the string is changed, and
2. The resulting gene string exists in the bank.

**Example:**
```
Input: start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
```

<details>
<summary>Hint</summary>
This is a shortest path problem similar to Word Ladder. Use BFS to explore all possible valid mutations.
</details>

<details>
<summary>Solution Approach</summary>

```javascript
function minMutation(start, end, bank) {
    if (!bank.includes(end)) return -1;
    
    const geneOptions = ['A', 'C', 'G', 'T'];
    const queue = [[start, 0]]; // [gene, mutations]
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [gene, mutations] = queue.shift();
        
        if (gene === end) {
            return mutations;
        }
        
        // Try changing each character
        for (let i = 0; i < 8; i++) {
            for (const option of geneOptions) {
                if (option !== gene[i]) {
                    const newGene = gene.slice(0, i) + option + gene.slice(i + 1);
                    
                    if (bank.includes(newGene) && !visited.has(newGene)) {
                        visited.add(newGene);
                        queue.push([newGene, mutations + 1]);
                    }
                }
            }
        }
    }
    
    return -1; // No valid path
}
```

Time Complexity: O(N × L), where N is the size of the bank and L is the length of the gene string (8 in this case)  
Space Complexity: O(N) for the queue and visited set
</details>

## Challenge Problems

These more advanced problems require combining BFS with other algorithms or techniques:

### 11. Bus Routes

**Problem:** You are given an array `routes` representing bus routes where routes[i] is a bus route that the i-th bus repeats forever. For example, if routes[0] = [1, 5, 7], this means that the 0-th bus travels in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> ... forever.

You start at the bus stop `source` and want to go to `target`. Return the least number of buses you must take to travel from source to target. If it's not possible, return -1.

**Example:**
```
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
Explanation: Take the first bus to stop 7, then take the second bus to stop 6.
```

<details>
<summary>Solution Approach</summary>

```javascript
function numBusesToDestination(routes, source, target) {
    if (source === target) return 0;
    
    // Map each stop to the buses that pass through it
    const stopToBuses = new Map();
    
    for (let bus = 0; bus < routes.length; bus++) {
        for (const stop of routes[bus]) {
            if (!stopToBuses.has(stop)) {
                stopToBuses.set(stop, []);
            }
            stopToBuses.get(stop).push(bus);
        }
    }
    
    const queue = [[source, 0]]; // [stop, buses taken]
    const visitedStops = new Set([source]);
    const visitedBuses = new Set();
    
    while (queue.length > 0) {
        const [stop, buses] = queue.shift();
        
        if (stop === target) {
            return buses;
        }
        
        // Try all buses that pass through this stop
        for (const bus of stopToBuses.get(stop) || []) {
            if (visitedBuses.has(bus)) continue;
            
            visitedBuses.add(bus);
            
            // Try all stops of this bus
            for (const nextStop of routes[bus]) {
                if (!visitedStops.has(nextStop)) {
                    visitedStops.add(nextStop);
                    queue.push([nextStop, buses + 1]);
                }
            }
        }
    }
    
    return -1; // Impossible to reach target
}
```

Time Complexity: O(R + S) where R is the total number of stops across all routes and S is the number of stops  
Space Complexity: O(R + S) for the queue and visited sets
</details>

### 12. Pacific Atlantic Water Flow

**Problem:** Given an m x n matrix of non-negative integers representing the height of each unit cell, where the Pacific Ocean touches the left and top edges and the Atlantic Ocean touches the right and bottom edges, water can flow from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic Ocean.

**Example:**
```
Input: heights = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

<details>
<summary>Solution Approach</summary>

```javascript
function pacificAtlantic(heights) {
    if (!heights || heights.length === 0) return [];
    
    const rows = heights.length;
    const cols = heights[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    // Cells that can reach Pacific and Atlantic
    const pacific = Array(rows).fill().map(() => Array(cols).fill(false));
    const atlantic = Array(rows).fill().map(() => Array(cols).fill(false));
    
    // BFS from Pacific and Atlantic edges
    const pacificQueue = [];
    const atlanticQueue = [];
    
    // Initialize queues with edge cells
    for (let i = 0; i < rows; i++) {
        pacific[i][0] = true;
        atlantic[i][cols - 1] = true;
        pacificQueue.push([i, 0]);
        atlanticQueue.push([i, cols - 1]);
    }
    
    for (let j = 0; j < cols; j++) {
        pacific[0][j] = true;
        atlantic[rows - 1][j] = true;
        pacificQueue.push([0, j]);
        atlanticQueue.push([rows - 1, j]);
    }
    
    // BFS from Pacific
    bfs(pacificQueue, pacific);
    
    // BFS from Atlantic
    bfs(atlanticQueue, atlantic);
    
    // Find cells that can reach both oceans
    const result = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }
    
    return result;
    
    function bfs(queue, reachable) {
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < rows && 
                    newCol >= 0 && newCol < cols && 
                    !reachable[newRow][newCol] && 
                    heights[newRow][newCol] >= heights[row][col]) {
                    reachable[newRow][newCol] = true;
                    queue.push([newRow, newCol]);
                }
            }
        }
    }
}
```

Time Complexity: O(rows × cols) as we visit each cell at most once for each ocean  
Space Complexity: O(rows × cols) for the queue and visited matrices
</details>

## Tips for Solving BFS Problems

1. **Identify the Graph Structure**: Recognize whether you're dealing with a tree, grid, or general graph. This affects how you'll track visited nodes.

2. **Determine the Starting Point(s)**: Most BFS problems start from a single point, but some might require starting from multiple points simultaneously.

3. **Define the State**: Decide what information needs to be tracked for each node. This might include position, distance, number of steps taken, or other properties.

4. **Choose the Right Data Structures**:
   - Use a queue for the BFS traversal
   - Use a set or hash map to track visited states
   - For grids, use a 2D array as the visited matrix

5. **Handle Edge Cases**: Don't forget to check for empty trees/graphs, single-node cases, or special conditions mentioned in the problem.

6. **Optimize When Possible**:
   - Use bidirectional BFS for some problems
   - Prune the search space when possible
   - Use more efficient data structures for specific operations

Remember that BFS is particularly powerful for finding shortest paths, level-order traversals, and exploring all possibilities in a systematic way.

## Conclusion

Practice these problems to strengthen your understanding of BFS and its applications. Start with the easy problems and gradually move to harder ones as you become more comfortable with the algorithm. Remember that the key to mastering BFS is understanding when and how to apply it to different problem contexts. 