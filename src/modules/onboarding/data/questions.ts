import { QuizQuestionDto } from '../dto/onboarding.dto';

export const dataStructuresQuestions: QuizQuestionDto[] = [
  {
    id: 'question-array-list-1',
    algorithmId: 'array-list',
    question:
      'What is the time complexity of accessing an element in an array using its index?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-stack-1',
    algorithmId: 'stack',
    question: 'Which principle does a stack follow?',
    options: ['FIFO', 'LIFO', 'FILO', 'None'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-stack-2',
    algorithmId: 'stack',
    question: 'Which operation adds an element to the top of a stack?',
    options: ['Push', 'Pop', 'Enqueue', 'Dequeue'],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-queue-1',
    algorithmId: 'queue',
    question: 'Which principle does a queue follow?',
    options: ['FIFO', 'LIFO', 'FILO', 'None'],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-queue-2',
    algorithmId: 'queue',
    question: 'Which operation removes an element from the front of a queue?',
    options: ['Enqueue', 'Dequeue', 'Push', 'Pop'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-singly-linked-list-1',
    algorithmId: 'singly-linked-list',
    question: 'How do you traverse a singly linked list?',
    options: [
      'Iteratively from head to tail',
      'Backward from tail to head',
      'Randomly',
      'All of the above',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-singly-linked-list-2',
    algorithmId: 'singly-linked-list',
    question:
      'What is the time complexity of inserting an element at the beginning of a singly linked list (given the head node)?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-doubly-linked-list-1',
    algorithmId: 'doubly-linked-list',
    question:
      'What is the main difference between a singly linked list and a doubly linked list?',
    options: [
      'A singly linked list has one pointer per node, while a doubly linked list has two pointers.',
      'A doubly linked list can only be traversed forward.',
      'A singly linked list supports random access.',
      'A doubly linked list does not allow insertion at the head.',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-ring-buffer-1',
    algorithmId: 'ring-buffer',
    question:
      'What happens when you try to add an element to a full ring buffer?',
    options: [
      'The oldest element is overwritten.',
      'An error is thrown.',
      'The buffer expands dynamically.',
      'The buffer resets itself.',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-hash-map-1',
    algorithmId: 'hash-map',
    question:
      'What is the average time complexity for insertion and lookup in a hash map?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswerIndex: 0,
  },
];

export const searchingSortingQuestions: QuizQuestionDto[] = [
  {
    id: 'question-linear-search-1',
    algorithmId: 'linear-search',
    question:
      'What is the worst-case time complexity of searching for an element in an unsorted array using linear search?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-binary-search-1',
    algorithmId: 'binary-search',
    question: 'What is the prerequisite for using binary search on an array?',
    options: [
      'The array must be sorted.',
      'The array must have unique elements.',
      'The array must be unsorted.',
      'The array must contain only integers.',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-bubble-sort-1',
    algorithmId: 'bubble-sort',
    question: 'What is the worst-case time complexity of bubble sort?',
    options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'question-insertion-sort-1',
    algorithmId: 'insertion-sort',
    question: 'What is the best-case time complexity of insertion sort?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-merge-sort-1',
    algorithmId: 'merge-sort',
    question: 'What is the time complexity of merge sort in all cases?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-merge-sort-2',
    algorithmId: 'merge-sort',
    question: 'Which algorithmic paradigm does merge sort use?',
    options: [
      'Greedy',
      'Dynamic Programming',
      'Divide and Conquer',
      'Backtracking',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'question-quick-sort-1',
    algorithmId: 'quick-sort',
    question: 'What is the worst-case time complexity of quick sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'question-quick-sort-2',
    algorithmId: 'quick-sort',
    question: 'What is a key element in the quick sort algorithm?',
    options: [
      'Merging two sorted arrays',
      'Using a pivot element',
      'Sequential comparison',
      'Tree traversal',
    ],
    correctAnswerIndex: 1,
  },
];

export const treeStructuresQuestions: QuizQuestionDto[] = [
  {
    id: 'question-binary-tree-traversal-1',
    algorithmId: 'binary-tree-traversal',
    question:
      'Which traversal visits nodes in the order: left child, root, right child?',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-binary-tree-traversal-2',
    algorithmId: 'binary-tree-traversal',
    question: 'In which traversal order is the root node visited first?',
    options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-binary-tree-search-1',
    algorithmId: 'binary-tree-search',
    question:
      'What is the time complexity of searching in a balanced binary search tree?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'question-binary-tree-bfs-1',
    algorithmId: 'binary-tree-bfs',
    question:
      'Which data structure is typically used to implement BFS in a binary tree?',
    options: ['Stack', 'Queue', 'Linked List', 'Array'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-binary-tree-dfs-1',
    algorithmId: 'binary-tree-dfs',
    question: 'Which of the following is NOT a type of DFS traversal?',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    correctAnswerIndex: 3,
  },
  {
    id: 'question-binary-tree-invert-1',
    algorithmId: 'binary-tree-invert',
    question: 'What does inverting a binary tree do?',
    options: [
      'Swaps left and right children for every node',
      'Reverses the order of nodes at each level',
      'Changes the tree to its mirror image',
      'All of the above',
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 'question-binary-tree-compare-1',
    algorithmId: 'binary-tree-compare',
    question: 'Two binary trees are considered identical if:',
    options: [
      'They have the same number of nodes',
      'They have the same height',
      'They have the same structure and node values',
      'Their in-order traversals are the same',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'question-binary-tree-lowest-common-ancestor-1',
    algorithmId: 'binary-tree-lowest-common-ancestor',
    question:
      'What is the lowest common ancestor (LCA) of two nodes in a binary tree?',
    options: [
      'The root node of the tree',
      'The deepest node that is an ancestor of both nodes',
      'The node with the lowest value among common ancestors',
      'The first common node encountered in a pre-order traversal',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-avl-tree-1',
    algorithmId: 'avl-tree',
    question: 'What is the key property of an AVL tree?',
    options: [
      "It's always a complete binary tree",
      'The difference in height between left and right subtrees is at most 1',
      'It allows duplicate keys',
      "It's always perfectly balanced",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-red-black-tree-1',
    algorithmId: 'red-black-tree',
    question: 'Which of the following is NOT a property of a Red-Black tree?',
    options: [
      'Every node is either red or black',
      'The root is always black',
      'Every leaf (NIL) is black',
      'Red nodes always have two black children',
    ],
    correctAnswerIndex: 3,
  },
];

export const advancedDataStructuresQuestions: QuizQuestionDto[] = [
  {
    id: 'question-min-heap-1',
    algorithmId: 'min-heap',
    question:
      'What is the time complexity of extracting the minimum element from a min heap?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-max-heap-1',
    algorithmId: 'max-heap',
    question: 'In a max heap, where is the largest element always located?',
    options: [
      'At the root',
      'At the leftmost leaf',
      'At the rightmost leaf',
      'Randomly distributed',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-trie-1',
    algorithmId: 'trie',
    question: 'What is the primary use case for a Trie data structure?',
    options: [
      'Sorting numbers',
      'Efficient string search and prefix matching',
      'Balancing binary trees',
      'Graph traversal',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-lru-cache-1',
    algorithmId: 'lru-cache',
    question: 'What does LRU stand for in LRU Cache?',
    options: [
      'Least Recently Used',
      'Last Regularly Updated',
      'Least Redundant Unit',
      'Long-Running Utility',
    ],
    correctAnswerIndex: 0,
  },
];

export const graphAlgorithmsQuestions: QuizQuestionDto[] = [
  {
    id: 'question-graph-matrix-bfs-1',
    algorithmId: 'graph-matrix-bfs',
    question:
      'What is the time complexity of BFS on a graph represented as an adjacency matrix?',
    options: ['O(V + E)', 'O(V²)', 'O(E log V)', 'O(V log E)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-graph-list-bfs-1',
    algorithmId: 'graph-list-bfs',
    question: 'What data structure is typically used to implement BFS?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-graph-list-dfs-1',
    algorithmId: 'graph-list-dfs',
    question: 'Which data structure is typically used to implement DFS?',
    options: ['Queue', 'Stack', 'Priority Queue', 'Hash Map'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-dijkstra-list-1',
    algorithmId: 'dijkstra-list',
    question: "What type of graph problem does Dijkstra's algorithm solve?",
    options: [
      'Finding the shortest path between two vertices',
      'Finding the minimum spanning tree',
      'Finding strongly connected components',
      'Topological sorting',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-kruskal-1',
    algorithmId: 'kruskal',
    question:
      "What does Kruskal's algorithm find in a weighted, undirected graph?",
    options: [
      'Shortest path between two vertices',
      'Minimum spanning tree',
      'Maximum flow',
      'Strongly connected components',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-prims-list-1',
    algorithmId: 'prims-list',
    question:
      "What is the main difference between Prim's and Kruskal's algorithms?",
    options: [
      "Prim's works on directed graphs, Kruskal's on undirected",
      "Prim's starts with a vertex, Kruskal's starts with an edge",
      "Prim's finds shortest paths, Kruskal's finds minimum spanning trees",
      "Prim's uses BFS, Kruskal's uses DFS",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-topological-sort-1',
    algorithmId: 'topological-sort',
    question: 'Which type of graph is required for topological sorting?',
    options: [
      'Undirected graph',
      'Directed acyclic graph (DAG)',
      'Weighted graph',
      'Complete graph',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-articulation-points-1',
    algorithmId: 'articulation-points',
    question: 'What is an articulation point in a graph?',
    options: [
      'A vertex with the highest degree',
      'A vertex whose removal increases the number of connected components',
      'A vertex that connects two cycles',
      'A vertex with no outgoing edges',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-a-star-1',
    algorithmId: 'a-star',
    question: "What makes A* different from Dijkstra's algorithm?",
    options: [
      'A* works on unweighted graphs',
      'A* uses a heuristic function to guide the search',
      'A* finds the longest path',
      'A* only works on trees',
    ],
    correctAnswerIndex: 1,
  },
];

export const dynamicProgrammingQuestions: QuizQuestionDto[] = [
  {
    id: 'question-fibonacci-sequence-1',
    algorithmId: 'fibonacci-sequence',
    question:
      'What is the time complexity of calculating the nth Fibonacci number using dynamic programming?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(2^n)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-longest-common-subsequence-1',
    algorithmId: 'longest-common-subsequence',
    question:
      'What is the time complexity of finding the longest common subsequence using dynamic programming?',
    options: ['O(m + n)', 'O(m * n)', 'O(m^2 * n^2)', 'O(2^(m+n))'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-knapsack-0-1-1',
    algorithmId: 'knapsack-0-1',
    question: "In the 0/1 Knapsack problem, what does '0/1' signify?",
    options: [
      'The weights must be 0 or 1',
      'The values must be 0 or 1',
      'An item can either be fully included or not at all',
      'The problem has only two possible solutions',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'question-knapsack-fractional-1',
    algorithmId: 'knapsack-fractional',
    question:
      'How does the Fractional Knapsack problem differ from the 0/1 Knapsack problem?',
    options: [
      'Fractional Knapsack allows partial items to be included',
      'Fractional Knapsack only works with decimal weights',
      'Fractional Knapsack is solved using dynamic programming',
      'Fractional Knapsack has a higher time complexity',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-coin-change-1',
    algorithmId: 'coin-change',
    question: 'What does the Coin Change problem typically ask to find?',
    options: [
      'The maximum number of coins needed',
      'The minimum number of coins needed to make a given amount',
      'The total value of all coins',
      'The number of different coin denominations',
    ],
    correctAnswerIndex: 1,
  },
];

export const stringArrayQuestions: QuizQuestionDto[] = [
  {
    id: 'question-palindrome-check-1',
    algorithmId: 'palindrom-check',
    question: 'What is a palindrome?',
    options: [
      'A word that starts and ends with the same letter',
      'A sequence that reads the same backward as forward',
      'A string with all unique characters',
      'A word with an even number of letters',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-anagram-check-1',
    algorithmId: 'anagram-check',
    question: 'What is the key characteristic of anagrams?',
    options: [
      'They have the same length',
      'They use the same letters in different orders',
      'They have the same meaning',
      'They start with the same letter',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-two-sum-problem-1',
    algorithmId: 'two-sum-problem',
    question:
      'What is the most efficient time complexity for solving the Two Sum problem?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-max-subarray-sum-kadane-1',
    algorithmId: 'max-subarray-sum-kadane',
    question:
      "What is the time complexity of Kadane's algorithm for finding the maximum subarray sum?",
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-max-subarray-sum-sliding-window-1',
    algorithmId: 'max-subarray-sum-sliding-window',
    question:
      'In the sliding window technique, what happens when the window size is fixed?',
    options: [
      'The window always starts from the beginning of the array',
      'The window size changes dynamically',
      'The window moves through the array, maintaining its size',
      'The window only moves in one direction',
    ],
    correctAnswerIndex: 2,
  },
];

export const miscellaneousQuestions: QuizQuestionDto[] = [
  {
    id: 'question-two-crystal-balls-1',
    algorithmId: 'two-crystal-balls',
    question:
      'What is the optimal time complexity for solving the Two Crystal Balls problem?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(√n)'],
    correctAnswerIndex: 3,
  },
  {
    id: 'question-cycle-detection-1',
    algorithmId: 'cycle-detection',
    question:
      'Which algorithm is commonly used for cycle detection in linked lists?',
    options: [
      'Bubble Sort',
      "Floyd's Cycle-Finding Algorithm",
      "Dijkstra's Algorithm",
      'Binary Search',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-job-sequencing-1',
    algorithmId: 'job-sequencing',
    question: 'What is the primary goal of job sequencing algorithms?',
    options: [
      'Minimize the total completion time of all jobs',
      'Maximize the number of jobs completed',
      'Ensure all jobs start at the same time',
      'Randomize the order of job execution',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-activity-selection-1',
    algorithmId: 'activity-selection',
    question:
      'What is the key idea behind the greedy approach in activity selection?',
    options: [
      'Always select the longest activity',
      'Always select the shortest activity',
      'Select the activity that starts earliest',
      'Select the activity that finishes earliest',
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 'question-huffman-encoding-1',
    algorithmId: 'huffman-encoding',
    question: 'What is the primary use of Huffman encoding?',
    options: [
      'Sorting data',
      'Data compression',
      'Encryption',
      'Error correction',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'question-hamiltonian-path-1',
    algorithmId: 'hamiltonian-path',
    question: 'What is a Hamiltonian path in a graph?',
    options: [
      'A path that visits each vertex exactly once',
      'A path that visits each edge exactly once',
      'The shortest path between two vertices',
      'A path that forms a cycle',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-hamiltonian-cycle-1',
    algorithmId: 'hamiltonian-cycle',
    question: 'How does a Hamiltonian cycle differ from a Hamiltonian path?',
    options: [
      'A cycle must return to the starting vertex',
      'A cycle can visit vertices multiple times',
      'A cycle must use all edges in the graph',
      'There is no difference',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'question-maze-solver-1',
    algorithmId: 'maze-solver',
    question: 'Which algorithm is commonly used for solving mazes?',
    options: [
      'Bubble Sort',
      'Depth-First Search',
      'Binary Search',
      'Insertion Sort',
    ],
    correctAnswerIndex: 1,
  },
];

export const questions = [
  {
    id: 'data-structures',
    name: 'Data Structures',
    description:
      'A comprehensive collection of data structures, from basic to advanced.',
    questions: dataStructuresQuestions,
  },
  {
    id: 'searching-sorting',
    name: 'Searching and Sorting',
    description:
      'A comprehensive collection of searching and sorting algorithms, from basic to advanced.',
    questions: searchingSortingQuestions,
  },
  {
    id: 'tree-structures',
    name: 'Tree Structures',
    description:
      'A comprehensive collection of tree structures, from basic to advanced.',
    questions: treeStructuresQuestions,
  },
  {
    id: 'advanced-data-structures',
    name: 'Advanced Data Structures',
    description:
      'A comprehensive collection of advanced data structures, from basic to advanced.',
    questions: advancedDataStructuresQuestions,
  },
  {
    id: 'graph-algorithms',
    name: 'Graph Algorithms',
    description:
      'A comprehensive collection of graph algorithms, from basic to advanced.',
    questions: graphAlgorithmsQuestions,
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    description:
      'A comprehensive collection of dynamic programming algorithms, from basic to advanced.',
    questions: dynamicProgrammingQuestions,
  },
  {
    id: 'string-array-questions',
    name: 'String and Array Questions',
    description:
      'A comprehensive collection of string and array questions, from basic to advanced.',
    questions: stringArrayQuestions,
  },
  {
    id: 'miscellaneous-questions',
    name: 'Miscellaneous Questions',
    description:
      'A comprehensive collection of miscellaneous questions, from basic to advanced.',
    questions: miscellaneousQuestions,
  },
];
