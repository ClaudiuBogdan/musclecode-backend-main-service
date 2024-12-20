import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  DailyAlgorithm,
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

  findAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmPracticeData | null>;

  updateAlgorithmNotes(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<void>;

  // Submission operations
  createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
    userId: string,
  ): Promise<AlgorithmSubmission>;

  findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]>;

  // Seeding
  seed(): Promise<void>;
}
