import {
  Algorithm,
  AlgorithmFileType,
  CodeLanguage,
} from '../interfaces/algorithm.interface';

export const seedAlgorithms = (): Algorithm[] => {
  return [
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      category: 'Sorting',
      tags: ['sorting', 'bubble sort'],
      notes: `
# Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
      `,
      completed: false,
      summary:
        'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      description: `
# Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

## How it works:

1. Start with an unsorted array of n elements.
2. Compare the first two elements of the array.
3. If the first element is greater than the second element, swap them.
4. Move to the next pair of adjacent elements, repeat steps 2-3 until the end of the array.
5. Repeat steps 1-4 for n-1 passes.

## Example:

\`\`\`
Initial array: [64, 34, 25, 12, 22, 11, 90]

Pass 1: [34, 25, 12, 22, 11, 64, 90]
Pass 2: [25, 12, 22, 11, 34, 64, 90]
Pass 3: [12, 22, 11, 25, 34, 64, 90]
Pass 4: [12, 11, 22, 25, 34, 64, 90]
Pass 5: [11, 12, 22, 25, 34, 64, 90]

Sorted array: [11, 12, 22, 25, 34, 64, 90]
\`\`\`

## Time Complexity:
- Worst and Average Case: O(n^2)
- Best Case: O(n) when the array is already sorted

## Space Complexity:
- O(1) as only a single additional memory space is required for the swapping temp variable.

`,
      difficulty: 'easy',
      files: [
        {
          id: 'bubble-sort-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            'export function bubbleSort(arr: number[]): number[] {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\nfor (let j = 0; j < n - i - 1; j++) {\n  if (arr[j] > arr[j + 1]) {\n// Swap elements\n[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n  }\n}\n  }\n  return arr;\n}',
          language: CodeLanguage.TYPESCRIPT,
          extension: 'ts',
          required: true,
        },
        {
          id: 'bubble-sort-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { bubbleSort } from './solution';\n\ntest('bubbleSort', () => {\n  expect(bubbleSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);\n})",
          language: CodeLanguage.TYPESCRIPT,
          extension: 'ts',
          readOnly: true,
        },
        {
          id: 'bubble-sort-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            "def bubble_sort(arr):\n  n = len(arr)\n  for i in range(n):\n    for j in range(0, n - i - 1):\n      if arr[j] > arr[j + 1]:\n        arr[j], arr[j + 1] = arr[j + 1], arr[j]\n  return arr\n\nif __name__ == '__main__':\n    print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))",
          language: CodeLanguage.PYTHON,
          extension: 'py',
          required: true,
        },
        {
          id: 'bubble-sort-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import bubble_sort\n\ndef test_bubble_sort():\n  assert bubble_sort([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]',
          language: CodeLanguage.PYTHON,
          extension: 'py',
          readOnly: true,
        },
      ],
    },
    {
      id: 'selection-sort',
      title: 'Selection Sort',
      category: 'Sorting',
      tags: ['sorting', 'selection sort'],
      notes: `
# Selection Sort

Selection Sort is a simple sorting algorithm that divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list.
      `,
      completed: false,
      summary:
        'A sorting algorithm that selects the smallest element from an unsorted part and puts it at the beginning.',
      description: `
# Selection Sort

Selection Sort is a simple sorting algorithm that divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list.

## How it works:

1. Find the smallest element in the unsorted portion.
2. Swap it with the first element of the unsorted portion.
3. Move the boundary between the sorted and unsorted portions one element to the right.
4. Repeat steps 1-3 until the entire list is sorted.

## Example:

\`\`\`
Initial array: [64, 25, 12, 22, 11]

Pass 1: [11, 25, 12, 22, 64]
Pass 2: [11, 12, 25, 22, 64]
Pass 3: [11, 12, 22, 25, 64]
Pass 4: [11, 12, 22, 25, 64]

Sorted array: [11, 12, 22, 25, 64]
\`\`\`

## Time Complexity:
- O(n^2) for all cases (worst, average, and best)

## Space Complexity:
- O(1) as it sorts in-place

`,
      difficulty: 'easy',
      files: [
        {
          id: 'selection-sort-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            'export function selectionSort(arr: number[]): number[] {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\nlet minIdx = i;\nfor (let j = i + 1; j < n; j++) {\n  if (arr[j] < arr[minIdx]) {\nminIdx = j;\n  }\n}\nif (minIdx !== i) {\n  [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n}\n  }\n  return arr;\n}',
          language: CodeLanguage.TYPESCRIPT,
          required: true,
          extension: 'ts',
        },
        {
          id: 'selection-sort-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { selectionSort } from './solution';\n\ntest('selectionSort', () => {\n  expect(selectionSort([64, 25, 12, 22, 11])).toEqual([11, 12, 22, 25, 64]);\n})",
          language: CodeLanguage.TYPESCRIPT,
          extension: 'ts',
          readOnly: true,
        },
        {
          id: 'selection-sort-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            "def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nif __name__ == '__main__':\n    print(selection_sort([64, 25, 12, 22, 11]))",
          language: CodeLanguage.PYTHON,
          required: true,
          extension: 'py',
        },
        {
          id: 'selection-sort-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import selection_sort\n\ndef test_selection_sort():\n  assert selection_sort([64, 25, 12, 22, 11]) == [11, 12, 22, 25, 64]',
          language: CodeLanguage.PYTHON,
          extension: 'py',
          readOnly: true,
        },
      ],
    },
    {
      id: 'insertion-sort',
      title: 'Insertion Sort',
      category: 'Sorting',
      tags: ['sorting', 'insertion sort'],
      notes: '',
      summary:
        'A simple sorting algorithm that builds the final sorted array one item at a time.',
      description: `
# Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.

## How it works:

1. Start with the second element (assume the first element is already sorted).
2. Compare the second element with the first and insert it into the correct position.
3. Continue to the next element and insert it into the correct position in the sorted portion.
4. Repeat step 3 until no input elements remain.

## Example:

\`\`\`
Initial array: [5, 2, 4, 6, 1, 3]

Pass 1: [2, 5, 4, 6, 1, 3]
Pass 2: [2, 4, 5, 6, 1, 3]
Pass 3: [2, 4, 5, 6, 1, 3]
Pass 4: [1, 2, 4, 5, 6, 3]
Pass 5: [1, 2, 3, 4, 5, 6]

Sorted array: [1, 2, 3, 4, 5, 6]
\`\`\`

## Time Complexity:
- Worst and Average Case: O(n^2)
- Best Case: O(n) when the array is already sorted

## Space Complexity:
- O(1) as it sorts in-place

`,
      difficulty: 'easy',
      completed: false,
      files: [
        {
          id: 'insertion-sort-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            'export function insertionSort(arr: number[]): number[] {\n  for (let i = 1; i < arr.length; i++) {\nlet key = arr[i];\nlet j = i - 1;\nwhile (j >= 0 && arr[j] > key) {\n  arr[j + 1] = arr[j];\n  j--;\n}\narr[j + 1] = key;\n  }\n  return arr;\n}',
          language: CodeLanguage.TYPESCRIPT,
          extension: 'ts',
          required: true,
        },
        {
          id: 'insertion-sort-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { insertionSort } from './solution';\n\ntest('insertionSort', () => {\n  expect(insertionSort([5, 2, 4, 6, 1, 3])).toEqual([1, 2, 3, 4, 5, 6]);\n})",
          language: CodeLanguage.TYPESCRIPT,
          readOnly: true,
          extension: 'ts',
        },
        {
          id: 'insertion-sort-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nif __name__ == '__main__':\n    print(insertion_sort([5, 2, 4, 6, 1, 3]))",
          language: CodeLanguage.PYTHON,
          required: true,
          extension: 'py',
        },
        {
          id: 'insertion-sort-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import insertion_sort\n\ndef test_insertion_sort():\n  assert insertion_sort([5, 2, 4, 6, 1, 3]) == [1, 2, 3, 4, 5, 6]',
          language: CodeLanguage.PYTHON,
          readOnly: true,
          extension: 'py',
        },
      ],
    },
    {
      id: 'merge-sort',
      title: 'Merge Sort',
      category: 'Sorting',
      tags: ['sorting', 'merge sort'],
      completed: false,
      notes: '',
      summary:
        'A divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges them.',
      description: `
# Merge Sort

Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It works by dividing the unsorted list into n sublists, each containing one element, then repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining.

## How it works:

1. Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
2. Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.

## Example:

\`\`\`
Initial array: [38, 27, 43, 3, 9, 82, 10]

Divide: [38, 27, 43, 3] [9, 82, 10]
Divide: [38, 27] [43, 3] [9, 82] [10]
Divide: [38] [27] [43] [3] [9] [82] [10]

Merge: [27, 38] [3, 43] [9, 82] [10]
Merge: [3, 27, 38, 43] [9, 10, 82]
Merge: [3, 9, 10, 27, 38, 43, 82]

Sorted array: [3, 9, 10, 27, 38, 43, 82]
\`\`\`

## Time Complexity:
- O(n log n) for all cases (worst, average, and best)

## Space Complexity:
- O(n) as it requires additional space for merging

`,
      difficulty: 'medium',
      files: [
        {
          id: 'merge-sort-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            'export function mergeSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n\n  return merge(left, right);\n}\n\nfunction merge(left: number[], right: number[]): number[] {\n  let result = [];\n  let leftIndex = 0;\n  let rightIndex = 0;\n\n  while (leftIndex < left.length && rightIndex < right.length) {\nif (left[leftIndex] < right[rightIndex]) {\n  result.push(left[leftIndex]);\n  leftIndex++;\n} else {\n  result.push(right[rightIndex]);\n  rightIndex++;\n}\n  }\n\n  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));\n}',
          language: CodeLanguage.TYPESCRIPT,
          required: true,
          extension: 'ts',
        },
        {
          id: 'merge-sort-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { mergeSort } from './solution';\n\ntest('mergeSort', () => {\n  expect(mergeSort([38, 27, 43, 3, 9, 82, 10])).toEqual([3, 9, 10, 27, 38, 43, 82]);\n})",
          language: CodeLanguage.TYPESCRIPT,
          readOnly: true,
          extension: 'ts',
        },
        {
          id: 'merge-sort-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    left_index, right_index = 0, 0\n\n    while left_index < len(left) and right_index < len(right):\n        if left[left_index] < right[right_index]:\n            result.append(left[left_index])\n            left_index += 1\n        else:\n            result.append(right[right_index])\n            right_index += 1\n\n    result.extend(left[left_index:])\n    result.extend(right[right_index:])\n    return result\n\nif __name__ == '__main__':\n    print(merge_sort([38, 27, 43, 3, 9, 82, 10]))",
          language: CodeLanguage.PYTHON,
          required: true,
          extension: 'py',
        },
        {
          id: 'merge-sort-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import merge_sort\n\ndef test_merge_sort():\n  assert merge_sort([38, 27, 43, 3, 9, 82, 10]) == [3, 9, 10, 27, 38, 43, 82]',
          language: CodeLanguage.PYTHON,
          readOnly: true,
          extension: 'py',
        },
      ],
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      category: 'Searching',
      tags: ['searching', 'binary search'],
      completed: false,
      notes: '',
      summary:
        'A fast search algorithm that finds the position of a target value within a sorted array.',
      description: `
# Binary Search

Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half. It works by comparing the middle element of the array with the target value. If the target value matches the middle element, the position is returned. If the target value is less or more than the middle element, the search continues in the lower or upper half of the array, respectively.

## How it works:

1. Compare the target value to the middle element of the array.
2. If the target value equals the middle element, the search is complete.
3. If the target value is less than the middle element, repeat the search on the lower half of the array.
4. If the target value is greater than the middle element, repeat the search on the upper half of the array.
5. If the search ends with an empty half-array, the target value is not in the array.

## Example:

\`\`\`
Sorted array: [1, 3, 4, 6, 8, 9, 11]
Target value: 6

Step 1: Middle element is 6. Target found!

Sorted array: [1, 3, 4, 6, 8, 9, 11]
Target value: 1

Step 1: Middle element is 6. 1 < 6, so search lower half.
Step 2: Middle element is 3. 1 < 3, so search lower half.
Step 3: Middle element is 1. Target found!
\`\`\`

## Time Complexity:
- O(log n) for all cases

## Space Complexity:
- O(1) for iterative implementation
- O(log n) for recursive implementation due to the call stack

`,
      difficulty: 'easy',
      files: [
        {
          id: 'binary-search-solution-js',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content: `
export function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // Target found, return its index
        } else if (arr[mid] < target) {
            left = mid + 1; // Move to the right half
        } else {
            right = mid - 1; // Move to the left half
        }
    }

    return -1; // Target not found
}
          `,
          language: CodeLanguage.JAVASCRIPT,
          required: true,
          extension: 'js',
        },

        {
          id: 'binary-search-test-js',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content: `
import { binarySearch } from './solution';

test('binarySearch', () => {
    expect(binarySearch([1, 3, 4, 6, 8, 9, 11], 6)).toBe(3);
    expect(binarySearch([1, 3, 4, 6, 8, 9, 11], 5)).toBe(-1);
});
          `,
          language: CodeLanguage.JAVASCRIPT,
          readOnly: true,
          extension: 'js',
        },
        {
          id: 'binary-search-solution-go',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content: `
package main

import "fmt"

func binarySearch(arr []int, target int) int {
    left, right := 0, len(arr) - 1
    for left <= right {
        mid := (left + right) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}
`,
          language: CodeLanguage.GO,
          required: true,
          extension: 'go',
        },
        {
          id: 'binary-search-test-go',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content: `
package main

import "testing"

func TestBinarySearch(t *testing.T) {
	arr := []int{1, 3, 4, 6, 8, 9, 11}
	if got := binarySearch(arr, 6); got != 3 {
		t.Errorf("binarySearch(arr, 6) = %v, want %v", got, 3)
	}
	if got := binarySearch(arr, 5); got != -1 {
		t.Errorf("binarySearch(arr, 5) = %v, want %v", got, -1)
	}
}
          `,
          language: CodeLanguage.GO,
          readOnly: true,
          extension: 'go',
        },
        {
          id: 'binary-search-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content: `
export function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // Target found, return its index
        } else if (arr[mid] < target) {
            left = mid + 1; // Move to the right half
        } else {
            right = mid - 1; // Move to the left half
        }
    }

    return -1; // Target not found
}
          `,
          language: CodeLanguage.TYPESCRIPT,
          required: true,
          extension: 'ts',
        },
        {
          id: 'binary-search-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { binarySearch } from './solution';\n\ntest('binarySearch', () => {\n  expect(binarySearch([1, 3, 4, 6, 8, 9, 11], 6)).toBe(3);\n  expect(binarySearch([1, 3, 4, 6, 8, 9, 11], 5)).toBe(-1);\n})",
          language: CodeLanguage.TYPESCRIPT,
          readOnly: true,
          extension: 'ts',
        },
        {
          id: 'binary-search-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content: `
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # Target not found

if __name__ == '__main__':
    print(binary_search([1, 3, 4, 6, 8, 9, 11], 6))
          `,
          language: CodeLanguage.PYTHON,
          required: true,
          extension: 'py',
        },
        {
          id: 'binary-search-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import binary_search\n\ndef test_binary_search():\n  assert binary_search([1, 3, 4, 6, 8, 9, 11], 6) == 3\n  assert binary_search([1, 3, 4, 6, 8, 9, 11], 5) == -1',
          language: CodeLanguage.PYTHON,
          readOnly: true,
          extension: 'py',
        },
      ],
    },
    {
      id: 'depth-first-search',
      title: 'Depth-First Search',
      category: 'Graph Traversal',
      tags: ['graph traversal', 'depth-first search'],
      notes: '',
      completed: false,
      summary:
        'A traversal approach that explores as far as possible along each branch before backtracking.',
      description: `
# Depth-First Search (DFS)

Depth-First Search is an algorithm for traversing or searching tree or graph data structures. It starts at a root node and explores as far as possible along each branch before backtracking.

## How it works:

1. Start at the root (or any arbitrary node for a graph).
2. Mark the current node as visited.
3. Recursively traverse all the adjacent unvisited nodes.
4. Repeat steps 2-3 until all nodes are visited.

## Example:

Consider the following graph:

\`\`\`
A
   / \\
  B   C
 / \\   \\
D   E   F
\`\`\`

DFS traversal starting from A:
A -> B -> D -> E -> C -> F

## Time Complexity:
- O(V + E) where V is the number of vertices and E is the number of edges in the graph

## Space Complexity:
- O(V) in the worst case, when the graph is a tree and completely unbalanced

`,
      difficulty: 'medium',
      files: [
        {
          id: 'depth-first-search-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            'export class Graph {\n  private adjacencyList: Map<number, number[]>;\n\n  constructor() {\nthis.adjacencyList = new Map();\n  }\n\n  addVertex(vertex: number) {\nif (!this.adjacencyList.has(vertex)) {\n  this.adjacencyList.set(vertex, []);\n}\n  }\n\n  addEdge(vertex1: number, vertex2: number) {\nthis.adjacencyList.get(vertex1)?.push(vertex2);\nthis.adjacencyList.get(vertex2)?.push(vertex1);\n  }\n\n  dfs(start: number): number[] {\nconst visited: Set<number> = new Set();\nconst result: number[] = [];\n\nconst dfsHelper = (vertex: number) => {\n  visited.add(vertex);\n  result.push(vertex);\n\n  this.adjacencyList.get(vertex)?.forEach(neighbor => {\nif (!visited.has(neighbor)) {\n  dfsHelper(neighbor);\n}\n  });\n};\n\ndfsHelper(start);\nreturn result;\n  }\n}',
          language: CodeLanguage.TYPESCRIPT,
          required: true,
          extension: 'ts',
        },
        {
          id: 'depth-first-search-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { Graph } from './solution';\n\ntest('depthFirstSearch', () => {\n  const graph = new Graph();\n  [0, 1, 2, 3, 4, 5].forEach(v => graph.addVertex(v));\n  [[0, 1], [0, 2], [1, 3], [2, 4], [2, 5]].forEach(([v1, v2]) => graph.addEdge(v1, v2));\n  expect(graph.dfs(0)).toEqual([0, 1, 3, 2, 4, 5]);\n})",
          language: CodeLanguage.TYPESCRIPT,
          readOnly: true,
          extension: 'ts',
        },
        {
          id: 'depth-first-search-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            "class Graph:\n    def __init__(self):\n        self.adjacency_list = {}\n\n    def add_vertex(self, vertex):\n        if vertex not in self.adjacency_list:\n            self.adjacency_list[vertex] = []\n\n    def add_edge(self, vertex1, vertex2):\n        self.adjacency_list[vertex1].append(vertex2)\n        self.adjacency_list[vertex2].append(vertex1)\n\n    def dfs(self, start):\n        visited = set()\n        result = []\n\n        def dfs_helper(vertex):\n            visited.add(vertex)\n            result.append(vertex)\n\n            for neighbor in self.adjacency_list[vertex]:\n                if neighbor not in visited:\n                    dfs_helper(neighbor)\n\n        dfs_helper(start)\n        return result\n\nif __name__ == '__main__':\n    graph = Graph()\n    for v in range(6):\n        graph.add_vertex(v)\n    for v1, v2 in [(0, 1), (0, 2), (1, 3), (2, 4), (2, 5)]:\n        graph.add_edge(v1, v2)\n    print(graph.dfs(0))",
          language: CodeLanguage.PYTHON,
          required: true,
          extension: 'py',
        },
        {
          id: 'depth-first-search-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import Graph\n\ndef test_depth_first_search():\n    graph = Graph()\n    for v in range(6):\n        graph.add_vertex(v)\n    for v1, v2 in [(0, 1), (0, 2), (1, 3), (2, 4), (2, 5)]:\n        graph.add_edge(v1, v2)\n    assert graph.dfs(0) == [0, 1, 3, 2, 4, 5]',
          language: CodeLanguage.PYTHON,
          readOnly: true,
          extension: 'py',
        },
      ],
    },
    {
      id: '8',
      title: 'Breadth-First Search',
      category: 'Graph Traversal',
      tags: ['graph traversal', 'breadth-first search'],
      notes: '',
      completed: false,
      summary:
        'A traversal approach that explores all the nodes at the present depth prior to moving on to nodes at the next depth level.',
      description: `
# Breadth-First Search (BFS)

Breadth-First Search is an algorithm for traversing or searching tree or graph data structures. It starts at a root node and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

## How it works:

1. Start at the root (or any arbitrary node for a graph).
2. Explore all the neighboring unvisited nodes at the present depth.
3. Move to the next level of nodes.
4. Repeat steps 2-3 until all nodes are visited.

## Example:

Consider the following graph:

\`\`\`
A
   / \\
  B   C
 / \\   \\
D   E   F
\`\`\`

BFS traversal starting from A:
A -> B -> C -> D -> E -> F

## Time Complexity:
- O(V + E) where V is the number of vertices and E is the number of edges in the graph

## Space Complexity:
- O(V) where V is the number of vertices in the graph

`,
      difficulty: 'medium',
      files: [
        {
          id: 'breadth-first-search-solution-ts',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            'export class Graph {\n  private adjacencyList: Map<number, number[]>;\n\n  constructor() {\nthis.adjacencyList = new Map();\n  }\n\n  addVertex(vertex: number) {\nif (!this.adjacencyList.has(vertex)) {\n  this.adjacencyList.set(vertex, []);\n}\n  }\n\n  addEdge(vertex1: number, vertex2: number) {\nthis.adjacencyList.get(vertex1)?.push(vertex2);\nthis.adjacencyList.get(vertex2)?.push(vertex1);\n  }\n\n  bfs(start: number): number[] {\nconst visited: Set<number> = new Set();\nconst queue: number[] = [];\nconst result: number[] = [];\n\nvisited.add(start);\nqueue.push(start);\n\nwhile (queue.length > 0) {\n  const vertex = queue.shift()!;\n  result.push(vertex);\n\n  this.adjacencyList.get(vertex)?.forEach(neighbor => {\nif (!visited.has(neighbor)) {\n  visited.add(neighbor);\n  queue.push(neighbor);\n}\n  });\n}\n\nreturn result;\n  }\n}',
          language: CodeLanguage.TYPESCRIPT,
          required: true,
          extension: 'ts',
        },
        {
          id: 'breadth-first-search-test-ts',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            "import { Graph } from './solution';\n\ntest('breadthFirstSearch', () => {\n  const graph = new Graph();\n  [0, 1, 2, 3, 4, 5].forEach(v => graph.addVertex(v));\n  [[0, 1], [0, 2], [1, 3], [2, 4], [2, 5]].forEach(([v1, v2]) => graph.addEdge(v1, v2));\n  expect(graph.bfs(0)).toEqual([0, 1, 2, 3, 4, 5]);\n})",
          language: CodeLanguage.TYPESCRIPT,
          readOnly: true,
          extension: 'ts',
        },
        {
          id: 'breadth-first-search-solution-py',
          name: 'solution',
          type: AlgorithmFileType.SOLUTION,
          content:
            "from collections import deque\n\nclass Graph:\n    def __init__(self):\n        self.adjacency_list = {}\n\n    def add_vertex(self, vertex):\n        if vertex not in self.adjacency_list:\n            self.adjacency_list[vertex] = []\n\n    def add_edge(self, vertex1, vertex2):\n        self.adjacency_list[vertex1].append(vertex2)\n        self.adjacency_list[vertex2].append(vertex1)\n\n    def bfs(self, start):\n        visited = set()\n        queue = deque([start])\n        result = []\n\n        visited.add(start)\n\n        while queue:\n            vertex = queue.popleft()\n            result.append(vertex)\n\n            for neighbor in self.adjacency_list[vertex]:\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    queue.append(neighbor)\n\n        return result\n\nif __name__ == '__main__':\n    graph = Graph()\n    for v in range(6):\n        graph.add_vertex(v)\n    for v1, v2 in [(0, 1), (0, 2), (1, 3), (2, 4), (2, 5)]:\n        graph.add_edge(v1, v2)\n    print(graph.bfs(0))",
          language: CodeLanguage.PYTHON,
          extension: 'py',
          required: true,
        },
        {
          id: 'breadth-first-search-test-py',
          name: 'test',
          type: AlgorithmFileType.TEST,
          content:
            'from solution import Graph\n\ndef test_breadth_first_search():\n    graph = Graph()\n    for v in range(6):\n        graph.add_vertex(v)\n    for v1, v2 in [(0, 1), (0, 2), (1, 3), (2, 4), (2, 5)]:\n        graph.add_edge(v1, v2)\n    assert graph.bfs(0) == [0, 1, 2, 3, 4, 5]',
          language: CodeLanguage.PYTHON,
          extension: 'py',
          readOnly: true,
        },
      ],
    },
  ];
};
