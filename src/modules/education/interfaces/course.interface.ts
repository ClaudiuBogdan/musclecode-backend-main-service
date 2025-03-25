import { AlgorithmCollection } from '@prisma/client';
import { AlgorithmPreview } from 'src/modules/algorithm/interfaces/algorithm.interface';

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  answer: string;
  hint?: string;
  explanation?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  overview: string;
  objectives: string[];
  prerequisites: string[];
  targetAudience: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  collection: AlgorithmCollection;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseOutline {
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  collection: {
    title: string;
    description: string;
    algorithms: AlgorithmPreview[];
  };
}

interface AlgorithmPreview {
  id: string;
  title: string;
  summary: string;
  difficulty: string;
  categories: string[];
  lessons: {
    id: string;
    title: string;
    description: string;
  }[];
}
