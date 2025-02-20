import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnboardingQuizSeed {
  constructor(private prisma: PrismaService) {}

  async seed() {
    const questions = [
      // Arrays and Strings
      {
        topic: 'arrays',
        difficulty: 'beginner',
        question:
          'What is the time complexity of accessing an element in an array by its index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctOption: 0,
        explanation:
          'Array access by index is constant time O(1) because arrays store elements in contiguous memory locations.',
      },
      {
        topic: 'arrays',
        difficulty: 'intermediate',
        question:
          'Which technique is most efficient for finding a pair of numbers in a sorted array that sum to a target value?',
        options: [
          'Nested loops checking all pairs',
          'Binary search for each element',
          'Two pointers from start and end',
          'Hash table lookup',
        ],
        correctOption: 2,
        explanation:
          'Two pointers technique is optimal for sorted arrays, running in O(n) time.',
      },

      // Dynamic Programming
      {
        topic: 'dynamic_programming',
        difficulty: 'beginner',
        question: 'What is the main idea behind dynamic programming?',
        options: [
          'Solving problems by dividing them into smaller subproblems',
          'Using recursion to solve complex problems',
          'Breaking down problems and storing subproblem solutions to avoid recomputation',
          'Using loops instead of recursion',
        ],
        correctOption: 2,
        explanation:
          'Dynamic programming optimizes solutions by storing and reusing subproblem results.',
      },
      {
        topic: 'dynamic_programming',
        difficulty: 'intermediate',
        question: 'Which problem is best suited for dynamic programming?',
        options: [
          'Finding the maximum element in an array',
          'Binary search in a sorted array',
          'Finding all permutations of a string',
          'Finding the longest common subsequence of two strings',
        ],
        correctOption: 3,
        explanation:
          'Longest common subsequence exhibits optimal substructure and overlapping subproblems.',
      },

      // Graphs
      {
        topic: 'graphs',
        difficulty: 'beginner',
        question:
          'Which algorithm is used to find the shortest path in an unweighted graph?',
        options: [
          'Depth-First Search (DFS)',
          'Breadth-First Search (BFS)',
          "Dijkstra's Algorithm",
          'Floyd-Warshall Algorithm',
        ],
        correctOption: 1,
        explanation:
          'BFS guarantees the shortest path in unweighted graphs by exploring nodes level by level.',
      },
      {
        topic: 'graphs',
        difficulty: 'intermediate',
        question:
          "What is the time complexity of Dijkstra's algorithm with a binary heap?",
        options: ['O(V^2)', 'O(V + E)', 'O((V + E) log V)', 'O(VE)'],
        correctOption: 2,
        explanation:
          "Using a binary heap, Dijkstra's algorithm runs in O((V + E) log V) time.",
      },

      // Trees
      {
        topic: 'trees',
        difficulty: 'beginner',
        question:
          'What is the height of a balanced binary search tree with n nodes?',
        options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
        correctOption: 1,
        explanation:
          'A balanced BST has height O(log n) as each level is filled before creating new ones.',
      },
      {
        topic: 'trees',
        difficulty: 'intermediate',
        question:
          'Which traversal of a binary tree visits nodes in sorted order for a BST?',
        options: [
          'Preorder traversal',
          'Postorder traversal',
          'Inorder traversal',
          'Level-order traversal',
        ],
        correctOption: 2,
        explanation:
          'Inorder traversal of a BST visits nodes in ascending order.',
      },

      // Problem-Solving Strategies
      {
        topic: 'problem_solving',
        difficulty: 'beginner',
        question: 'What is the first step in solving an algorithmic problem?',
        options: [
          'Start coding immediately',
          "Look for similar problems you've solved",
          'Understand the problem and constraints clearly',
          'Choose a programming language',
        ],
        correctOption: 2,
        explanation:
          'Understanding the problem and constraints is crucial before attempting any solution.',
      },
      {
        topic: 'problem_solving',
        difficulty: 'intermediate',
        question: 'Which approach is most helpful when stuck on a problem?',
        options: [
          'Immediately look up the solution',
          'Try to solve a simpler version first',
          'Skip to another problem',
          'Keep trying the same approach',
        ],
        correctOption: 1,
        explanation:
          'Solving a simpler version helps understand patterns and build toward the full solution.',
      },
    ];

    // Insert questions
    for (const question of questions) {
      await this.prisma.onboardingQuizQuestion.upsert({
        where: {
          id: `${question.topic}-${question.difficulty}-${question.correctOption}`, // Generate deterministic ID
        },
        update: question,
        create: {
          ...question,
          id: `${question.topic}-${question.difficulty}-${question.correctOption}`,
        },
      });
    }
  }
}
