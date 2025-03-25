export interface AlgorithmCollectionOutline {
  name: string;
  description: string;
  algorithms: AlgorithmPreview[];
}

export interface AlgorithmPreview {
  title: string;
  summary: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
}

export interface GeneratedAlgorithmTemplate {
  id?: string;
  title: string;
  categories: string[];
  summary: string;
  lessons: Lesson[];
  difficulty: string;
  level?: number;
  tags: string[];
  files: AlgorithmFile[];
  userId?: string;
  parentId?: string;
}

export interface AlgorithmFile {
  name: string;
  content: string;
  language: string;
  isTemplate: boolean;
  isSolution: boolean;
  isTest: boolean;
}

export interface Lesson {
  title: string;
  content: string;
  order: number;
  quizzes?: Quiz[];
}

export interface Quiz {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}
