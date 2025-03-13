from typing import List
import heapq

def a_star_search(grid: List[List[int]], start: List[int], goal: List[int]) -> List[List[int]]:
    """
    Iterative implementation of the A* search algorithm using a priority queue.
    """
    def heuristic(x: int, y: int) -> int:
        return abs(x - goal[0]) + abs(y - goal[1])
    
    rows = len(grid)
    cols = len(grid[0])
    
    # Priority queue: (f, counter, (x, y), g, parent)
    open_list = []
    counter = 0
    start_node = (heuristic(start[0], start[1]), counter, (start[0], start[1]), 0, None)
    heapq.heappush(open_list, start_node)
    
    closed = [[False] * cols for _ in range(rows)]
    came_from = {}
    
    while open_list:
        f, _, (x, y), g, parent = heapq.heappop(open_list)
        if closed[y][x]:
            continue
        closed[y][x] = True
        came_from[(x, y)] = parent

        if [x, y] == goal:
            path = []
            cur = (x, y)
            while cur is not None:
                path.append(list(cur))
                cur = came_from.get(cur, None)
            return path[::-1]
        
        for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
            new_x, new_y = x + dx, y + dy
            if new_y < 0 or new_y >= rows or new_x < 0 or new_x >= cols:
                continue
            if grid[new_y][new_x] == 1 or closed[new_y][new_x]:
                continue
            new_g = g + 1
            new_f = new_g + heuristic(new_x, new_y)
            counter += 1
            heapq.heappush(open_list, (new_f, counter, (new_x, new_y), new_g, (x, y)))
    
    return [] 