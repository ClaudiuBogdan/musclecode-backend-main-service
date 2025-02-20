import { Test, TestingModule } from '@nestjs/testing';
import { AlgorithmRepository } from './algorithm.repository';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  AlgorithmTemplate,
  AlgorithmFileType,
  CodeLanguage,
  AlgorithmRating,
} from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';

describe('AlgorithmRepository', () => {
  let repository: AlgorithmRepository;
  let prismaService: PrismaService;

  const mockTemplate: AlgorithmTemplate = {
    id: 'test-id',
    title: 'Test Algorithm',
    categories: ['test'],
    summary: 'test summary',
    description: 'test description',
    difficulty: 'easy',
    tags: ['test'],
    files: [
      {
        id: 'file-id',
        name: 'solution',
        type: AlgorithmFileType.SOLUTION,
        content: 'test content',
        language: CodeLanguage.TYPESCRIPT,
        extension: 'ts',
        required: true,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    algorithmTemplate: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    algorithmUserData: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    algorithmSubmission: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlgorithmRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<AlgorithmRepository>(AlgorithmRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAllTemplates', () => {
    it('should return all algorithm templates', async () => {
      const dbTemplate = {
        ...mockTemplate,
        tags: JSON.stringify(mockTemplate.tags),
        files: JSON.stringify(mockTemplate.files),
      };
      mockPrismaService.algorithmTemplate.findMany.mockResolvedValue([
        dbTemplate,
      ]);
      const result = await repository.findAllTemplates();
      expect(result[0]).toEqual(mockTemplate);
    });
  });

  describe('findTemplateById', () => {
    it('should return a template by id', async () => {
      const dbTemplate = {
        ...mockTemplate,
        tags: JSON.stringify(mockTemplate.tags),
        files: JSON.stringify(mockTemplate.files),
      };
      mockPrismaService.algorithmTemplate.findUnique.mockResolvedValue(
        dbTemplate,
      );
      const result = await repository.findTemplateById('test-id');
      expect(result).toEqual(mockTemplate);
    });

    it('should return null when template not found', async () => {
      mockPrismaService.algorithmTemplate.findUnique.mockResolvedValue(null);
      const result = await repository.findTemplateById('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('createTemplate', () => {
    it('should create a new template', async () => {
      const createDto: CreateAlgorithmDto = {
        title: 'New Algorithm',
        categories: ['test'],
        summary: 'test summary',
        description: 'test description',
        difficulty: 'easy',
        tags: ['test'],
        files: [
          {
            name: 'solution',
            type: AlgorithmFileType.SOLUTION,
            content: 'test content',
            language: CodeLanguage.TYPESCRIPT,
            extension: 'ts',
            required: true,
          },
        ],
      };

      const dbTemplate = {
        ...mockTemplate,
        tags: JSON.stringify(mockTemplate.tags),
        files: JSON.stringify(mockTemplate.files),
      };
      mockPrismaService.algorithmTemplate.create.mockResolvedValue(dbTemplate);
      const result = await repository.createTemplate(createDto);
      expect(result).toEqual(mockTemplate);
    });
  });

  describe('updateTemplate', () => {
    it('should update an existing template', async () => {
      const updateDto: UpdateAlgorithmDto = {
        title: 'Updated Algorithm',
      };

      const dbTemplate = {
        ...mockTemplate,
        title: 'Updated Algorithm',
        tags: JSON.stringify(mockTemplate.tags),
        files: JSON.stringify(mockTemplate.files),
      };
      mockPrismaService.algorithmTemplate.update.mockResolvedValue(dbTemplate);
      const result = await repository.updateTemplate('test-id', updateDto);
      expect(result.title).toBe('Updated Algorithm');
    });
  });

  describe('findAlgorithmPracticeData', () => {
    it('should return practice data for a user and algorithm', async () => {
      const dbUserData = {
        id: 'practice-id',
        userId: 'user-id',
        algorithmId: 'algorithm-id',
        notes: 'test notes',
        schedule: JSON.stringify({
          again: 0,
          hard: 0,
          good: 0,
          easy: 0,
        }),
        algorithm: {
          ...mockTemplate,
          tags: JSON.stringify(mockTemplate.tags),
          files: JSON.stringify(mockTemplate.files),
        },
      };
      mockPrismaService.algorithmUserData.findUnique.mockResolvedValue(
        dbUserData,
      );
      const result = await repository.findAlgorithmPracticeData(
        'user-id',
        'algorithm-id',
      );
      expect(result?.id).toBe('practice-id');
      expect(result?.algorithmTemplate).toEqual(mockTemplate);
    });
  });

  describe('createSubmission', () => {
    it('should create a new submission', async () => {
      const submission = {
        algorithmId: 'algorithm-id',
        algorithmUserDataId: 'user-data-id',
        rating: AlgorithmRating.EASY,
        code: 'test code',
        language: CodeLanguage.TYPESCRIPT,
        scheduleData: {
          due: new Date(),
          stability: 4,
          difficulty: 0,
          elapsedDays: 0,
          scheduledDays: 0,
          reps: 0,
          lapses: 0,
          state: 0 as const,
          lastReview: new Date(),
        },
        timeSpent: 300,
      };

      const dbSubmission = {
        id: 'submission-id',
        ...submission,
        createdAt: new Date(),
      };

      mockPrismaService.algorithmSubmission.create.mockResolvedValue(
        dbSubmission,
      );
      const result = await repository.createSubmission(submission, 'user-id');
      expect(result).toEqual(dbSubmission);
    });
  });

  describe('findUserSubmissions', () => {
    it('should return user submissions for an algorithm', async () => {
      const dbSubmission = {
        id: 'submission-id',
        algorithmId: 'algorithm-id',
        algorithmUserDataId: 'user-data-id',
        rating: AlgorithmRating.EASY,
        code: 'test code',
        language: CodeLanguage.TYPESCRIPT,
        timeSpent: 300,
        createdAt: new Date(),
      };

      mockPrismaService.algorithmSubmission.findMany.mockResolvedValue([
        dbSubmission,
      ]);
      const result = await repository.findUserSubmissions(
        'user-id',
        'algorithm-id',
      );
      expect(result[0]).toEqual(dbSubmission);
    });
  });

  describe('updateAlgorithmNotes', () => {
    it('should update algorithm notes', async () => {
      const dbUserData = {
        id: 'practice-id',
        userId: 'user-id',
        algorithmId: 'algorithm-id',
        notes: 'new notes',
      };
      mockPrismaService.algorithmUserData.update.mockResolvedValue(dbUserData);
      await repository.updateAlgorithmNotes(
        'user-id',
        'algorithm-id',
        'new notes',
      );
      expect(prismaService.algorithmUserData.update).toHaveBeenCalled();
    });
  });
});
