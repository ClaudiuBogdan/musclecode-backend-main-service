import { AlgorithmDifficulty } from './algorithm-difficulty.enum';

export interface AlgorithmTemplate {
  id: string;
  title: string;
  description: string;
  difficulty: AlgorithmDifficulty;
  createdAt: Date;
}
