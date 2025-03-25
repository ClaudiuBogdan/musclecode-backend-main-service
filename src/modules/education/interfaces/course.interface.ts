export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  content: string;
  exercises: Exercise[];
  quizQuestions: QuizQuestion[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedOutput?: string;
  solutionCode?: string;
}

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
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseOutline {
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  modules: {
    title: string;
    description: string;
    lessons: {
      title: string;
      description: string;
    }[];
  }[];
}
