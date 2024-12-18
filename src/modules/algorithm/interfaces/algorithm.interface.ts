export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AlgorithmFile {
  id: string;
  name: string;
  type: 'solution' | 'test';
  content: string;
  language: string;
  extension: string;
  readOnly?: boolean;
  required?: boolean;
}

export interface Algorithm {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  notes: string;
  completed: boolean;
  files: AlgorithmFile[];
}

export interface IAlgorithmRepository {
  findAll(): Promise<Algorithm[]>;
  findById(id: string): Promise<Algorithm | null>;
  create(
    algorithm: Omit<Algorithm, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Algorithm>;
  update(id: string, algorithm: Partial<Algorithm>): Promise<Algorithm>;
  delete(id: string): Promise<void>;
  seed(): Promise<void>;
}
