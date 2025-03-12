import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  AlgorithmFileType,
  AlgorithmLesson,
  CodeLanguage,
} from '../interfaces/algorithm.interface';

class CreateAlgorithmFileDto {
  @ApiProperty({ description: 'Name of the file' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type of the file',
    enum: AlgorithmFileType,
  })
  @IsEnum(AlgorithmFileType)
  type: AlgorithmFileType;

  @ApiProperty({ description: 'Content of the file' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Programming language of the file',
    enum: CodeLanguage,
  })
  @IsEnum(CodeLanguage)
  language: CodeLanguage;

  @ApiProperty({ description: 'File extension' })
  @IsString()
  @IsNotEmpty()
  extension: string;

  @ApiPropertyOptional({
    description: 'Whether the file is read-only',
  })
  @IsBoolean()
  @IsOptional()
  readOnly?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the file is required',
  })
  @IsBoolean()
  @IsOptional()
  required?: boolean;
}

export class CreateAlgorithmDto {
  @ApiProperty({ description: 'The title of the algorithm' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Category of the algorithm' })
  @IsString()
  @IsNotEmpty()
  categories: string[];

  @ApiProperty({ description: 'Summary of the algorithm' })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({ description: 'The lessons of the algorithm' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlgorithmLesson)
  @IsNotEmpty()
  lessons: AlgorithmLesson[];

  @ApiProperty({
    description: 'The difficulty level of the algorithm',
    enum: ['easy', 'medium', 'hard'],
  })
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @ApiPropertyOptional({
    description: 'Tags associated with the algorithm',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Notes about the algorithm' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Files associated with the algorithm',
    type: [CreateAlgorithmFileDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAlgorithmFileDto)
  files: CreateAlgorithmFileDto[];
}
