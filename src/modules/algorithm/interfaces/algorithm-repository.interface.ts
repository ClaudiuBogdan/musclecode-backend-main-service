import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  AlgorithmSubmission,
  AlgorithmRating,
} from './algorithm.interface';

export interface IAlgorithmRepository {
  seed(): Promise<void>;

  // Algorithm Template operations
  findAllTemplates(): Promise<AlgorithmTemplate[]>;
  findTemplateById(id: string): Promise<AlgorithmTemplate | null>;
  createTemplate(createAlgorithmDto: any): Promise<AlgorithmTemplate>;
  updateTemplate(
    id: string,
    updateAlgorithmDto: any,
  ): Promise<AlgorithmTemplate>;
  deleteTemplate(id: string): Promise<void>;

  // User-specific algorithm data operations
  findAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmPracticeData | null>;
  createAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmPracticeData>;
  updateAlgorithmNotes(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<void>;
  updateSchedule(
    userId: string,
    algorithmId: string,
    rating: AlgorithmRating,
  ): Promise<AlgorithmPracticeData>;

  // Submission operations
  createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
    userId: string,
  ): Promise<AlgorithmSubmission>;
  findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]>;

  // Due algorithms
  findDueAlgorithms(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AlgorithmPracticeData[]>;
}
