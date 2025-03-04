import { Prisma } from '@prisma/client';
import { loadAlgorithmTemplates } from 'src/modules/algorithm/seed/algorithm-loader.util';
import { INITIAL_COLLECTION_ID } from '../const';
export const seedCollections = (): Prisma.CollectionCreateInput[] => {
  return [
    {
      id: INITIAL_COLLECTION_ID,
      name: 'All Basic Algorithms',
      description:
        'A collection of the most important algorithms, including sorting, dynamic programming, graph algorithms, tree algorithms, array techniques, data structures, search algorithms, string manipulation, optimization, and greedy algorithms.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'sorting-algorithms',
      name: 'Sorting Algorithms',
      description:
        'A comprehensive collection of sorting algorithms, from basic to advanced.',
      userId: null, // System collection (public)
      algorithms: { create: [] }, // Empty initially, will be populated separately
    },
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      description:
        'Essential dynamic programming problems and patterns for mastering this technique.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'graph-algorithms',
      name: 'Graph Algorithms',
      description:
        'Common graph algorithms and their applications in solving real-world problems.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'tree-algorithms',
      name: 'Tree Algorithms',
      description:
        'Binary tree, Binary Search Tree, and other tree-based data structure algorithms.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'array-techniques',
      name: 'Array Techniques',
      description:
        'Essential array manipulation techniques including two pointers, sliding window, and more.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      description:
        'Essential data structures for efficient data organization and retrieval.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'search-algorithms',
      name: 'Search Algorithms',
      description:
        'Algorithms for efficiently finding elements in various data structures.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'string-manipulation',
      name: 'String Manipulation',
      description:
        'Algorithms for processing and analyzing text and string data.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'optimization',
      name: 'Optimization Algorithms',
      description:
        'Algorithms focused on finding optimal solutions to complex problems.',
      userId: null,
      algorithms: { create: [] },
    },
    {
      id: 'greedy-algorithms',
      name: 'Greedy Algorithms',
      description:
        'Algorithms that make locally optimal choices at each step with the hope of finding a global optimum.',
      userId: null,
      algorithms: { create: [] },
    },
  ];
};

export const seedAlgorithmCollections = async (): Promise<
  {
    algorithmId: string;
    collectionId: string;
  }[]
> => {
  const allAlgorithms = await loadAlgorithmTemplates();
  const defaultCollection = allAlgorithms.map((algorithm) => ({
    algorithmId: algorithm.id,
    collectionId: 'all-basic-algorithms',
  }));

  return [
    // Default Collection
    ...defaultCollection,

    // Sorting Algorithms Collection
    { algorithmId: 'bubble-sort', collectionId: 'sorting-algorithms' },
    { algorithmId: 'insertion-sort', collectionId: 'sorting-algorithms' },
    { algorithmId: 'merge-sort', collectionId: 'sorting-algorithms' },
    { algorithmId: 'quick-sort', collectionId: 'sorting-algorithms' },

    // Dynamic Programming Collection
    {
      algorithmId: 'longest-common-subsequence',
      collectionId: 'dynamic-programming',
    },
    {
      algorithmId: 'max-subarray-sum-kadane',
      collectionId: 'dynamic-programming',
    },
    { algorithmId: 'knapsack-0-1', collectionId: 'dynamic-programming' },
    { algorithmId: 'coin-change', collectionId: 'dynamic-programming' },
    { algorithmId: 'fibonacci-sequence', collectionId: 'dynamic-programming' },

    // Graph Algorithms Collection
    { algorithmId: 'graph-matrix-bfs', collectionId: 'graph-algorithms' },
    { algorithmId: 'graph-list-bfs', collectionId: 'graph-algorithms' },
    { algorithmId: 'graph-list-dfs', collectionId: 'graph-algorithms' },
    { algorithmId: 'dijkstra-list', collectionId: 'graph-algorithms' },
    { algorithmId: 'kruskal', collectionId: 'graph-algorithms' },
    { algorithmId: 'prims-list', collectionId: 'graph-algorithms' },
    { algorithmId: 'topological-sort', collectionId: 'graph-algorithms' },
    { algorithmId: 'articulation-points', collectionId: 'graph-algorithms' },
    { algorithmId: 'hamiltonian-path', collectionId: 'graph-algorithms' },
    { algorithmId: 'hamiltonian-cycle', collectionId: 'graph-algorithms' },
    { algorithmId: 'a-star', collectionId: 'graph-algorithms' },
    { algorithmId: 'maze-solver', collectionId: 'graph-algorithms' },
    { algorithmId: 'cycle-detection', collectionId: 'graph-algorithms' },

    // Tree Algorithms Collection
    { algorithmId: 'binary-tree-bfs', collectionId: 'tree-algorithms' },
    { algorithmId: 'binary-tree-dfs', collectionId: 'tree-algorithms' },
    { algorithmId: 'binary-tree-traversal', collectionId: 'tree-algorithms' },
    { algorithmId: 'binary-tree-invert', collectionId: 'tree-algorithms' },
    { algorithmId: 'binary-tree-compare', collectionId: 'tree-algorithms' },
    {
      algorithmId: 'binary-tree-lowest-common-ancestor',
      collectionId: 'tree-algorithms',
    },
    { algorithmId: 'binary-tree-search', collectionId: 'tree-algorithms' },
    { algorithmId: 'avl-tree', collectionId: 'tree-algorithms' },
    { algorithmId: 'red-black-tree', collectionId: 'tree-algorithms' },
    { algorithmId: 'trie', collectionId: 'tree-algorithms' },

    // Array Techniques Collection
    { algorithmId: 'array-list', collectionId: 'array-techniques' },
    { algorithmId: 'two-sum-problem', collectionId: 'array-techniques' },
    {
      algorithmId: 'max-subarray-sum-sliding-window',
      collectionId: 'array-techniques',
    },
    {
      algorithmId: 'max-subarray-sum-kadane',
      collectionId: 'array-techniques',
    },

    // Data Structures Collection
    { algorithmId: 'hash-map', collectionId: 'data-structures' },
    { algorithmId: 'singly-linked-list', collectionId: 'data-structures' },
    { algorithmId: 'doubly-linked-list', collectionId: 'data-structures' },
    { algorithmId: 'queue', collectionId: 'data-structures' },
    { algorithmId: 'stack', collectionId: 'data-structures' },
    { algorithmId: 'avl-tree', collectionId: 'data-structures' },
    { algorithmId: 'red-black-tree', collectionId: 'data-structures' },
    { algorithmId: 'min-heap', collectionId: 'data-structures' },
    { algorithmId: 'max-heap', collectionId: 'data-structures' },
    { algorithmId: 'trie', collectionId: 'data-structures' },
    { algorithmId: 'lru-cache', collectionId: 'data-structures' },
    { algorithmId: 'ring-buffer', collectionId: 'data-structures' },

    // Search Algorithms Collection
    { algorithmId: 'binary-search', collectionId: 'search-algorithms' },
    { algorithmId: 'linear-search', collectionId: 'search-algorithms' },
    { algorithmId: 'graph-list-bfs', collectionId: 'search-algorithms' },
    { algorithmId: 'graph-list-dfs', collectionId: 'search-algorithms' },
    { algorithmId: 'binary-tree-search', collectionId: 'search-algorithms' },
    { algorithmId: 'a-star', collectionId: 'search-algorithms' },
    { algorithmId: 'two-crystal-balls', collectionId: 'search-algorithms' },

    // String Manipulation Collection
    { algorithmId: 'palindrom-check', collectionId: 'string-manipulation' },
    { algorithmId: 'anagram-check', collectionId: 'string-manipulation' },
    {
      algorithmId: 'longest-common-subsequence',
      collectionId: 'string-manipulation',
    },
    { algorithmId: 'huffman-encoding', collectionId: 'string-manipulation' },

    // Optimization Algorithms Collection
    { algorithmId: 'knapsack-0-1', collectionId: 'optimization' },
    { algorithmId: 'knapsack-fractional', collectionId: 'optimization' },
    { algorithmId: 'dijkstra-list', collectionId: 'optimization' },
    { algorithmId: 'kruskal', collectionId: 'optimization' },
    { algorithmId: 'prims-list', collectionId: 'optimization' },
    { algorithmId: 'a-star', collectionId: 'optimization' },
    { algorithmId: 'job-sequencing', collectionId: 'optimization' },
    { algorithmId: 'activity-selection', collectionId: 'optimization' },
    { algorithmId: 'coin-change', collectionId: 'optimization' },

    // Greedy Algorithms Collection
    { algorithmId: 'activity-selection', collectionId: 'greedy-algorithms' },
    { algorithmId: 'job-sequencing', collectionId: 'greedy-algorithms' },
    { algorithmId: 'knapsack-fractional', collectionId: 'greedy-algorithms' },
    { algorithmId: 'dijkstra-list', collectionId: 'greedy-algorithms' },
    { algorithmId: 'kruskal', collectionId: 'greedy-algorithms' },
    { algorithmId: 'prims-list', collectionId: 'greedy-algorithms' },
    { algorithmId: 'huffman-encoding', collectionId: 'greedy-algorithms' },
  ];
};
