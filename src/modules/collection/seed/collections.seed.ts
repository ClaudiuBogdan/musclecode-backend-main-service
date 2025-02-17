import { Prisma } from '@prisma/client';

export const seedCollections = (): Prisma.CollectionCreateInput[] => {
  return [
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
      id: 'binary-trees',
      name: 'Binary Trees & BST',
      description:
        'Binary tree and Binary Search Tree problems, covering traversal, manipulation, and validation.',
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
  ];
};

export const seedAlgorithmCollections = (): {
  algorithmId: string;
  collectionId: string;
}[] => {
  return [
    // Sorting Algorithms Collection
    { algorithmId: 'bubble-sort', collectionId: 'sorting-algorithms' },
    { algorithmId: 'insertion-sort', collectionId: 'sorting-algorithms' },
    { algorithmId: 'merge-sort', collectionId: 'sorting-algorithms' },
    // { algorithmId: 'selection-sort', collectionId: 'sorting-algorithms' },
    // { algorithmId: 'quick-sort', collectionId: 'sorting-algorithms' },

    // // Dynamic Programming Collection
    // { algorithmId: 'fibonacci', collectionId: 'dynamic-programming' },
    // {
    //   algorithmId: 'longest-common-subsequence',
    //   collectionId: 'dynamic-programming',
    // },
    // { algorithmId: 'knapsack', collectionId: 'dynamic-programming' },
    // { algorithmId: 'coin-change', collectionId: 'dynamic-programming' },
    // {
    //   algorithmId: 'longest-increasing-subsequence',
    //   collectionId: 'dynamic-programming',
    // },

    // // Graph Algorithms Collection
    // { algorithmId: 'bfs', collectionId: 'graph-algorithms' },
    // { algorithmId: 'dfs', collectionId: 'graph-algorithms' },
    // { algorithmId: 'dijkstra', collectionId: 'graph-algorithms' },
    // { algorithmId: 'union-find', collectionId: 'graph-algorithms' },
    // { algorithmId: 'topological-sort', collectionId: 'graph-algorithms' },

    // // Binary Trees Collection
    // { algorithmId: 'binary-tree-traversal', collectionId: 'binary-trees' },
    // { algorithmId: 'validate-bst', collectionId: 'binary-trees' },
    // { algorithmId: 'lowest-common-ancestor', collectionId: 'binary-trees' },
    // { algorithmId: 'balanced-binary-tree', collectionId: 'binary-trees' },
    // { algorithmId: 'binary-tree-paths', collectionId: 'binary-trees' },

    // // Array Techniques Collection
    // { algorithmId: 'two-sum', collectionId: 'array-techniques' },
    // { algorithmId: 'three-sum', collectionId: 'array-techniques' },
    // { algorithmId: 'sliding-window-maximum', collectionId: 'array-techniques' },
    // {
    //   algorithmId: 'container-with-most-water',
    //   collectionId: 'array-techniques',
    // },
    // { algorithmId: 'subarray-sum', collectionId: 'array-techniques' },
  ];
};
