from typing import List, Optional

def a_star_search(grid: List[List[int]], start: List[int], goal: List[int]) -> List[List[int]]:
    """
    Recursive implementation of the A* search algorithm.
    """
    def heuristic(x: int, y: int) -> int:
        return abs(x - goal[0]) + abs(y - goal[1])
    
    rows = len(grid)
    cols = len(grid[0])
    closed = [[False] * cols for _ in range(rows)]
    
    class Node:
        def __init__(self, x: int, y: int, g: int, parent: Optional['Node']):
            self.x = x
            self.y = y
            self.g = g
            self.h = heuristic(x, y)
            self.f = self.g + self.h
            self.parent = parent

    open_list: List[Node] = [Node(start[0], start[1], 0, None)]

    def recursive_astar(open_list: List[Node]) -> Optional[Node]:
        if not open_list:
            return None
        current = min(open_list, key=lambda node: node.f)
        open_list.remove(current)
        if [current.x, current.y] == goal:
            return current
        closed[current.y][current.x] = True
        for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
            new_x, new_y = current.x + dx, current.y + dy
            if new_y < 0 or new_y >= rows or new_x < 0 or new_x >= cols:
                continue
            if grid[new_y][new_x] == 1 or closed[new_y][new_x]:
                continue
            new_g = current.g + 1
            skip = False
            for node in open_list:
                if node.x == new_x and node.y == new_y and new_g >= node.g:
                    skip = True
                    break
            if skip:
                continue
            open_list.append(Node(new_x, new_y, new_g, current))
        return recursive_astar(open_list)
    
    result = recursive_astar(open_list)
    if result is None:
        return []
    path = []
    while result:
        path.append([result.x, result.y])
        result = result.parent
    return path[::-1] 