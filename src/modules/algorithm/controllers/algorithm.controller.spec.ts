import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AlgorithmController } from './algorithm.controller';
import { AlgorithmService } from '../services/algorithm.service';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import {
  AlgorithmTemplate,
  AlgorithmFileType,
  CodeLanguage,
} from '../interfaces/algorithm.interface';

describe('AlgorithmController', () => {
  let controller: AlgorithmController;
  let service: AlgorithmService;

  const mockTemplate: AlgorithmTemplate = {
    id: 'test-id',
    title: 'Test Algorithm',
    categories: ['test'],
    summary: 'test summary',
    lessons: [
      {
        id: uuidv4(),
        title: 'Lesson 1',
        content: 'test content',
      },
    ],
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
        hidden: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockService = {
    findAllTemplates: jest.fn(),
    findTemplateById: jest.fn(),
    createTemplate: jest.fn(),
    updateTemplate: jest.fn(),
    deleteTemplate: jest.fn(),
    findPracticeData: jest.fn(),
    findDailyAlgorithms: jest.fn(),
    createSubmission: jest.fn(),
    findUserSubmissions: jest.fn(),
    updateAlgorithmNotes: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlgorithmController],
      providers: [
        {
          provide: AlgorithmService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AlgorithmController>(AlgorithmController);
    service = module.get<AlgorithmService>(AlgorithmService);
  });

  describe('findAllTemplates', () => {
    it('should return all algorithm templates', async () => {
      mockService.findAllTemplates.mockResolvedValue([mockTemplate]);
      const result = await controller.findAllTemplates();
      expect(result).toEqual([mockTemplate]);
      expect(service.findAllTemplates).toHaveBeenCalled();
    });
  });

  describe('findTemplateById', () => {
    it('should return a template by id', async () => {
      mockService.findTemplateById.mockResolvedValue(mockTemplate);
      const result = await controller.findTemplateById('test-id');
      expect(result).toEqual(mockTemplate);
      expect(service.findTemplateById).toHaveBeenCalledWith('test-id');
    });
  });

  describe('createTemplate', () => {
    it('should create a new template', async () => {
      const createDto: CreateAlgorithmDto = {
        title: 'New Algorithm',
        categories: ['test'],
        summary: 'test summary',
        lessons: [
          {
            id: uuidv4(),
            title: 'Lesson 1',
            content: 'test content',
          },
        ],
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
      mockService.createTemplate.mockResolvedValue(mockTemplate);
      const result = await controller.createTemplate(createDto);
      expect(result).toEqual(mockTemplate);
      expect(service.createTemplate).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateTemplate', () => {
    it('should update an existing template', async () => {
      const updateDto: UpdateAlgorithmDto = {
        title: 'Updated Algorithm',
      };
      const updatedTemplate = { ...mockTemplate, ...updateDto };
      mockService.updateTemplate.mockResolvedValue(updatedTemplate);
      const result = await controller.updateTemplate('test-id', updateDto);
      expect(result).toEqual(updatedTemplate);
      expect(service.updateTemplate).toHaveBeenCalledWith('test-id', updateDto);
    });
  });

  describe('findUserData', () => {
    it('should return user-specific algorithm data', async () => {
      const mockPracticeData = {
        id: 'practice-id',
        algorithmTemplate: mockTemplate,
        submissions: [],
        schedule: {
          again: 0,
          hard: 0,
          good: 0,
          easy: 0,
        },
      };
      mockService.findPracticeData.mockResolvedValue(mockPracticeData);
      const result = await controller.findUserData('user-id', 'algorithm-id');
      expect(result).toEqual(mockPracticeData);
      expect(service.findPracticeData).toHaveBeenCalledWith(
        'user-id',
        'algorithm-id',
      );
    });
  });

  describe('findDailyAlgorithms', () => {
    it('should return daily algorithms', async () => {
      const mockDailyAlgorithm = {
        id: mockTemplate.id,
        algorithmPreview: {
          id: mockTemplate.id,
          title: mockTemplate.title,
          categories: mockTemplate.categories,
          summary: mockTemplate.summary,
          difficulty: mockTemplate.difficulty,
          tags: mockTemplate.tags,
        },
        date: new Date(),
        completed: false,
        createdAt: mockTemplate.createdAt,
      };
      mockService.findDailyAlgorithms.mockResolvedValue([mockDailyAlgorithm]);
      const result = await controller.findDailyAlgorithms(
        'user-id',
        new Date().toISOString(),
      );
      expect(result).toEqual([mockDailyAlgorithm]);
      expect(service.findDailyAlgorithms).toHaveBeenCalled();
    });
  });

  describe('updateAlgorithmNotes', () => {
    it('should update algorithm notes', async () => {
      await controller.updateAlgorithmNotes(
        'user-id',
        'algorithm-id',
        'new notes',
      );
      expect(service.updateAlgorithmNotes).toHaveBeenCalledWith(
        'user-id',
        'algorithm-id',
        'new notes',
      );
    });
  });
});
