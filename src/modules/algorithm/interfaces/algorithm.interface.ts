import { ApiProperty } from '@nestjs/swagger';

export enum AlgorithmFileType {
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
    description: 'Whether the file is required',
    required: false,
  })
  required?: boolean;
}

export class AlgorithmTemplate {
  @ApiProperty({ description: 'Unique identifier of the algorithm' })
  id: string;

  @ApiProperty({ description: 'Title of the algorithm' })
  title: string;

  @ApiProperty({ description: 'Category of the algorithm' })
  category: string;

  @ApiProperty({ description: 'Summary of the algorithm' })
  summary: string;

  @ApiProperty({ description: 'Description of the algorithm' })
  description: string;

  @ApiProperty({
    description: 'Difficulty level of the algorithm',
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: 'easy' | 'medium' | 'hard';

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

export class AlgorithmUserData {
  @ApiProperty({ description: 'Unique identifier of the user data' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Algorithm ID' })
  algorithmId: string;

  @ApiProperty({
    description: 'User notes about the algorithm',
    required: false,
  })
  notes?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;
}

export class DailyAlgorithm {
  @ApiProperty({ description: 'Unique identifier of the daily algorithm' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Algorithm ID' })
  algorithmId: string;

  @ApiProperty({ description: 'Date for this daily algorithm' })
  date: Date;

  @ApiProperty({ description: 'Whether the algorithm has been completed' })
  completed: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;
}

export class AlgorithmSubmission {
  @ApiProperty({ description: 'Unique identifier of the submission' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Algorithm ID' })
  algorithmId: string;

  @ApiProperty({ description: 'Difficulty level of the submission' })
  difficulty: 'easy' | 'medium' | 'hard';

  @ApiProperty({ description: 'Notes about the submission' })
  notes?: string;

  @ApiProperty({ description: 'Submitted code' })
  code: string;

  @ApiProperty({
    description: 'Programming language of the submission',
    enum: CodeLanguage,
  })
  language: CodeLanguage;

  @ApiProperty({ description: 'Time spent on the solution in seconds' })
  timeSpent: number;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;
}

export class AlgorithmUserProgress {
  @ApiProperty({ description: 'User-specific algorithm data' })
  algorithmUserData: AlgorithmUserData;

  @ApiProperty({ description: 'Daily algorithm status', required: false })
  dailyAlgorithm: DailyAlgorithm | null;

  @ApiProperty({ description: 'Base algorithm template' })
  algorithmTemplate: AlgorithmTemplate;
}

export type AlgorithmPreview = Omit<AlgorithmTemplate, 'files'>;
