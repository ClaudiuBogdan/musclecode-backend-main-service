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

export class Algorithm {
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

  @ApiProperty({ description: 'Notes about the algorithm' })
  notes: string;

  @ApiProperty({
    description: 'Files associated with the algorithm',
    type: [AlgorithmFile],
  })
  files: AlgorithmFile[];

  @ApiProperty({ description: 'Whether the algorithm has been completed' })
  completed: boolean;
}

export type AlgorithmPreview = Omit<Algorithm, 'files'>;
