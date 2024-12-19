export type Difficulty = 'again' | 'hard' | 'good' | 'easy';

export interface Submission {
  id: string;
  userId: string;
  algorithmId: string;
  timeSpent: number;
  code: string;
  language: string;
  notes?: string;
  difficulty: Difficulty;
  createdAt: string;
}
