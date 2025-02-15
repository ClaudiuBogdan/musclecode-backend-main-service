import { Test, TestingModule } from '@nestjs/testing';
import { AlgorithmService } from './algorithm.service';
import { AlgorithmRepository } from '../repositories/algorithm.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import {
  AlgorithmTemplate,
  AlgorithmSubmission,
  AlgorithmPracticeData,
  AlgorithmRating,
  CodeLanguage,
} from '../interfaces/algorithm.interface';

describe('AlgorithmService', () => {
  let service: AlgorithmService;
  let repository: AlgorithmRepository;

  const mockTemplate: AlgorithmTemplate = {
    id: 'test-id',
    title: 'Test Algorithm',
    categories: ['test'],
    summary: 'test summary',
    description: 'test description',
    difficulty: 'easy',
    tags: ['test'],
    files: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    seed: jest.fn(),
    findAllTemplates: jest.fn(),
    findTemplateById: jest.fn(),
    createTemplate: jest.fn(),
    updateTemplate: jest.fn(),
    deleteTemplate: jest.fn(),
    findAlgorithmPracticeData: jest.fn(),
    findUserSubmissions: jest.fn(),
    createSubmission: jest.fn(),
    updateAlgorithmNotes: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlgorithmService,
        {
          provide: AlgorithmRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AlgorithmService>(AlgorithmService);
    repository = module.get<AlgorithmRepository>(AlgorithmRepository);
  });

  describe('onModuleInit', () => {
    it('should seed the database', async () => {
      await service.onModuleInit();
      expect(repository.seed).toHaveBeenCalled();
    });
  });

  describe('findAllTemplates', () => {
    it('should return all algorithm templates', async () => {
      mockRepository.findAllTemplates.mockResolvedValue([mockTemplate]);
      const result = await service.findAllTemplates();
      expect(result).toEqual([mockTemplate]);
    });
  });

  describe('findTemplateById', () => {
    it('should return a template by id', async () => {
      mockRepository.findTemplateById.mockResolvedValue(mockTemplate);
      const result = await service.findTemplateById('test-id');
      expect(result).toEqual(mockTemplate);
    });

    it('should throw NotFoundException when template not found', async () => {
      mockRepository.findTemplateById.mockResolvedValue(null);
      await expect(service.findTemplateById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
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
        files: [],
      };
      mockRepository.createTemplate.mockResolvedValue(mockTemplate);
      const result = await service.createTemplate(createDto);
      expect(result).toEqual(mockTemplate);
    });
  });

  describe('updateTemplate', () => {
    it('should update an existing template', async () => {
      const updateDto: UpdateAlgorithmDto = {
        title: 'Updated Algorithm',
      };
      mockRepository.findTemplateById.mockResolvedValue(mockTemplate);
      mockRepository.updateTemplate.mockResolvedValue({
        ...mockTemplate,
        ...updateDto,
      });
      const result = await service.updateTemplate('test-id', updateDto);
      expect(result.title).toBe('Updated Algorithm');
    });

    it('should throw NotFoundException when template not found', async () => {
      mockRepository.findTemplateById.mockResolvedValue(null);
      await expect(service.updateTemplate('non-existent', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteTemplate', () => {
    it('should delete an existing template', async () => {
      mockRepository.findTemplateById.mockResolvedValue(mockTemplate);
      await service.deleteTemplate('test-id');
      expect(repository.deleteTemplate).toHaveBeenCalledWith('test-id');
    });

    it('should throw NotFoundException when template not found', async () => {
      mockRepository.findTemplateById.mockResolvedValue(null);
      await expect(service.deleteTemplate('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findPracticeData', () => {
    it('should return practice data for a user and algorithm', async () => {
      const mockPracticeData: AlgorithmPracticeData = {
        id: 'practice-id',
        algorithmTemplate: mockTemplate,
        submissions: [],
        nextAlgorithm: null,
        dailyAlgorithm: null,
        ratingSchedule: {
          again: new Date().getTime(),
          hard: new Date().getTime(),
          good: new Date().getTime(),
          easy: new Date().getTime(),
        },
        due: new Date(),
        scheduleData: {
          due: new Date(),
          stability: 4,
          difficulty: 0,
          elapsedDays: 0,
          scheduledDays: 0,
          reps: 0,
          lapses: 0,
          state: 0,
          lastReview: new Date(),
        },
      };
      mockRepository.findAlgorithmPracticeData.mockResolvedValue(
        mockPracticeData,
      );
      const result = await service.findPracticeData('user-id', 'algorithm-id');
      expect(result).toEqual(mockPracticeData);
    });
  });

  describe('findDailyAlgorithms', () => {
    it('should return daily algorithms for a user', async () => {
      mockRepository.findAllTemplates.mockResolvedValue([mockTemplate]);
      const result = await service.findDailyAlgorithms('user-id');
      expect(result[0].id).toBe(mockTemplate.id);
      expect(result[0].completed).toBe(false);
    });
  });

  describe('createSubmission', () => {
    it('should create a new submission', async () => {
      const mockSubmission: Omit<AlgorithmSubmission, 'id' | 'createdAt'> = {
        algorithmId: 'algorithm-id',
        algorithmUserDataId: 'user-data-id',
        rating: AlgorithmRating.EASY,
        code: 'test code',
        language: CodeLanguage.TYPESCRIPT,
        timeSpent: 300,
        scheduleData: {
          due: new Date(),
          stability: 4,
          difficulty: 0,
          elapsedDays: 0,
          scheduledDays: 0,
          reps: 0,
          lapses: 0,
          state: 0,
          lastReview: new Date(),
        },
      };
      const fullSubmission: AlgorithmSubmission = {
        ...mockSubmission,
        id: 'submission-id',
        createdAt: new Date(),
      };
      mockRepository.createSubmission.mockResolvedValue(fullSubmission);
      const result = await service.createSubmission(
        'user-id',
        'algorithm-id',
        mockSubmission,
      );
      expect(result).toEqual(fullSubmission);
    });
  });

  describe('findUserSubmissions', () => {
    it('should return user submissions for an algorithm', async () => {
      const mockSubmissions: AlgorithmSubmission[] = [
        {
          id: 'submission-id',
          algorithmId: 'algorithm-id',
          algorithmUserDataId: 'user-data-id',
          rating: AlgorithmRating.EASY,
          code: 'test code',
          language: CodeLanguage.TYPESCRIPT,
          timeSpent: 300,
          scheduleData: {
            due: new Date(),
            stability: 4,
            difficulty: 0,
            elapsedDays: 0,
            scheduledDays: 0,
            reps: 0,
            lapses: 0,
            state: 0,
            lastReview: new Date(),
          },
          createdAt: new Date(),
        },
      ];
      mockRepository.findUserSubmissions.mockResolvedValue(mockSubmissions);
      const result = await service.findUserSubmissions(
        'user-id',
        'algorithm-id',
      );
      expect(result).toEqual(mockSubmissions);
    });
  });

  describe('updateAlgorithmNotes', () => {
    it('should update algorithm notes', async () => {
      await service.updateAlgorithmNotes(
        'user-id',
        'algorithm-id',
        'new notes',
      );
      expect(repository.updateAlgorithmNotes).toHaveBeenCalledWith(
        'user-id',
        'algorithm-id',
        'new notes',
      );
    });
  });
});
