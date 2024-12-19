import {
  AlgorithmTemplate,
  AlgorithmUserData,
  DailyAlgorithm,
  AlgorithmUserProgress,
  AlgorithmSubmission,
} from './algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';

export interface IAlgorithmRepository {
  // Algorithm Template operations
  findAllTemplates(): Promise<AlgorithmTemplate[]>;
  findTemplateById(id: string): Promise<AlgorithmTemplate | null>;
  createTemplate(
    createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<AlgorithmTemplate>;
  updateTemplate(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<AlgorithmTemplate>;
  deleteTemplate(id: string): Promise<void>;

  // User-specific algorithm data operations
  findUserData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmUserData | null>;
  createUserData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmUserData>;
  updateUserData(id: string, notes: string): Promise<AlgorithmUserData>;

  // Daily algorithm operations
  findDailyAlgorithms(userId: string, date: Date): Promise<DailyAlgorithm[]>;
  createDailyAlgorithm(
    userId: string,
    algorithmId: string,
    date: Date,
  ): Promise<DailyAlgorithm>;
  markDailyAlgorithmCompleted(id: string): Promise<DailyAlgorithm>;

  // Submission operations
  createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
  ): Promise<AlgorithmSubmission>;
  findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]>;

  // Combined data operations
  findUserProgress(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmUserProgress | null>;

  // Seeding
  seed(): Promise<void>;
}
