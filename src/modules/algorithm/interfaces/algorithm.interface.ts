import { ApiProperty } from '@nestjs/swagger';
import { SchedulingState } from '../../scheduler/types/scheduler.types';

export enum AlgorithmFileType {
  EXERCISE = 'exercise',
  SOLUTION = 'solution',
  TEST = 'test',
}

export enum CodeLanguage {
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  GO = 'go',
  JAVA = 'java',
  CPP = 'cpp',
}

export class AlgorithmSchedule {
  @ApiProperty({ description: 'Next scheduled interval for again rating' })
  again: number;

  @ApiProperty({ description: 'Next scheduled interval for hard rating' })
  hard: number;

  @ApiProperty({ description: 'Next scheduled interval for good rating' })
  good: number;

  @ApiProperty({ description: 'Next scheduled interval for easy rating' })
  easy: number;
}

export enum AlgorithmRating {
  EASY = 'easy',
  GOOD = 'good',
  HARD = 'hard',
  AGAIN = 'again',
}

export enum AlgorithmDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export class AlgorithmFile {
  @ApiProperty({ description: 'Unique identifier of the file' })
  id: string;

  @ApiProperty({ description: 'Name of the file' })
  name: string;

  @ApiProperty({
    description: 'Type of the file',
    enum: AlgorithmFileType,
  })
  type: AlgorithmFileType;

  @ApiProperty({ description: 'Content of the file' })
  content: string;

  @ApiProperty({
    description: 'Programming language of the file',
    enum: CodeLanguage,
  })
  language: CodeLanguage;

  @ApiProperty({ description: 'File extension' })
  extension: string;

  @ApiProperty({
    description: 'Whether the file is read-only',
    required: false,
  })
  readOnly?: boolean;

  @ApiProperty({
    description: 'Whether the file should be hidden from the user',
    required: false,
  })
  hidden?: boolean;
}

export class AlgorithmLesson {
  @ApiProperty({ description: 'Unique identifier of the lesson' })
  id: string;

  @ApiProperty({ description: 'Title of the lesson' })
  title: string;

  @ApiProperty({ description: 'Content of the lesson' })
  content: string;
}

export class AlgorithmTemplate {
  @ApiProperty({ description: 'Unique identifier of the algorithm' })
  id: string;

  @ApiProperty({ description: 'Title of the algorithm' })
  title: string;

  @ApiProperty({ description: 'Category of the algorithm' })
  categories: string[];

  @ApiProperty({ description: 'Summary of the algorithm' })
  summary: string;

  @ApiProperty({ description: 'Lessons of the algorithm' })
  lessons: AlgorithmLesson[];

  @ApiProperty({
    description: 'Difficulty level of the algorithm',
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: 'easy' | 'medium' | 'hard';

  @ApiProperty({ description: 'Level of the algorithm', required: false })
  level?: number;

  @ApiProperty({
    description: 'Tags associated with the algorithm',
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'Files associated with the algorithm',
    type: [AlgorithmFile],
  })
  files: AlgorithmFile[];

  createdAt: Date;
  updatedAt: Date;
}

export class AlgorithmPracticeData {
  @ApiProperty({
    description: 'Unique identifier of the algorithm practice data',
  })
  id: string;

  @ApiProperty({ description: 'Algorithm template' })
  algorithmTemplate: AlgorithmTemplate;

  @ApiProperty({
    description: 'User submissions for the algorithm',
    required: false,
  })
  submissions: AlgorithmSubmission[];

  @ApiProperty({
    description: 'FSRS scheduling data',
    required: true,
  })
  scheduleData: SchedulingState;

  @ApiProperty({
    description: 'FSRS scheduling data',
    required: true,
  })
  ratingSchedule: AlgorithmSchedule;

  @ApiProperty({
    description: 'Next algorithm to practice',
    required: false,
  })
  nextAlgorithm: AlgorithmPreview | null;

  @ApiProperty({
    description: 'Daily algorithm data',
    required: false,
  })
  dailyAlgorithm: DailyAlgorithm | null;

  @ApiProperty({
    description: 'Next due date for review',
    required: true,
  })
  due: Date;

  @ApiProperty({
    description: 'User notes about the algorithm',
    required: false,
  })
  notes?: string;
}

export class DailyAlgorithm {
  @ApiProperty({ description: 'Unique identifier of the daily algorithm' })
  id: string;

  @ApiProperty({ description: 'Algorithm template' })
  algorithmPreview: AlgorithmPreview;

  @ApiProperty({ description: 'Whether the algorithm has been completed' })
  completed: boolean;
}

export class AlgorithmSubmission {
  @ApiProperty({ description: 'Unique identifier of the submission' })
  id: string;

  @ApiProperty({ description: 'Algorithm ID' })
  algorithmId: string;

  @ApiProperty({ description: 'Algorithm user data ID' })
  algorithmUserDataId: string;

  @ApiProperty({ description: 'Submitted code' })
  files: AlgorithmFile[];

  @ApiProperty({ description: 'Programming language' })
  language: CodeLanguage;

  @ApiProperty({ description: 'Time spent in seconds' })
  timeSpent: number;

  @ApiProperty({ description: 'User notes', required: false })
  notes?: string;

  @ApiProperty({ description: 'Algorithm rating' })
  rating: AlgorithmRating;

  @ApiProperty({ description: 'FSRS scheduling data at submission time' })
  scheduleData: SchedulingState;

  @ApiProperty({ description: 'Submission date' })
  createdAt: Date;
}

export type AlgorithmPreview = Pick<
  AlgorithmTemplate,
  'id' | 'title' | 'categories' | 'summary' | 'difficulty'
>;
