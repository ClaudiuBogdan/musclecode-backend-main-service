import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AlgorithmModule } from '../algorithm.module';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  AlgorithmTemplate,
  AlgorithmFileType,
  CodeLanguage,
} from '../interfaces/algorithm.interface';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

describe('Algorithm Integration Tests', () => {
  let app: INestApplication;
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

  // Mock auth guard to simulate authenticated requests
  const mockAuthGuard = {
    canActivate: jest.fn().mockImplementation(() => true),
  };

  const mockRolesGuard = {
    canActivate: jest.fn().mockImplementation(() => true),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AlgorithmModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await prismaService.algorithmTemplate.deleteMany();
    await prismaService.algorithmUserData.deleteMany();
    await prismaService.submission.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  describe('/api/v1/algorithms/templates (GET)', () => {
    it('should return all algorithm templates', async () => {
      // Create a test template in the database
      await prismaService.algorithmTemplate.create({
        data: {
          ...mockTemplate,
          tags: mockTemplate.tags,
          files: JSON.stringify(mockTemplate.files),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/api/v1/algorithms/templates')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe(mockTemplate.title);
    });
  });

  describe('/api/v1/algorithms/templates/:id (GET)', () => {
    it('should return a specific algorithm template', async () => {
      // Create a test template in the database
      const template = await prismaService.algorithmTemplate.create({
        data: {
          ...mockTemplate,
          tags: mockTemplate.tags,
          files: JSON.stringify(mockTemplate.files),
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/api/v1/algorithms/templates/${template.id}`)
        .expect(200);

      expect(response.body.title).toBe(mockTemplate.title);
    });

    it('should return 404 for non-existent template', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/algorithms/templates/non-existent')
        .expect(404);
    });
  });

  describe('/api/v1/algorithms/templates (POST)', () => {
    it('should create a new algorithm template', async () => {
      const createDto = {
        title: 'New Algorithm',
        category: 'test',
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

      const response = await request(app.getHttpServer())
        .post('/api/v1/algorithms/templates')
        .send(createDto)
        .expect(201);

      expect(response.body.title).toBe(createDto.title);
      expect(response.body.files).toHaveLength(1);
    });
  });

  describe('/api/v1/algorithms/practice/:algorithmId (GET)', () => {
    it('should return user-specific algorithm data', async () => {
      // Create a test template and user data
      const template = await prismaService.algorithmTemplate.create({
        data: {
          ...mockTemplate,
          tags: mockTemplate.tags,
          files: JSON.stringify(mockTemplate.files),
        },
      });

      await prismaService.algorithmUserData.create({
        data: {
          userId: 'test-user',
          algorithmId: template.id,
          notes: 'test notes',
          scheduleData: JSON.stringify({
            due: new Date(),
            stability: 4,
            difficulty: 0,
            elapsedDays: 0,
            scheduledDays: 0,
            reps: 0,
            lapses: 0,
            state: 0,
            lastReview: new Date(),
          }),
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/api/v1/algorithms/practice/${template.id}`)
        .set('user-id', 'test-user')
        .expect(200);

      expect(response.body.notes).toBe('test notes');
    });
  });

  describe('/api/v1/algorithms/daily (GET)', () => {
    it('should return daily algorithms', async () => {
      // Create a test template
      await prismaService.algorithmTemplate.create({
        data: {
          ...mockTemplate,
          tags: mockTemplate.tags,
          files: JSON.stringify(mockTemplate.files),
        },
      });

      const response = await request(app.getHttpServer())
        .get('/api/v1/algorithms/daily')
        .set('user-id', 'test-user')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].completed).toBe(false);
    });
  });

  describe('/api/v1/algorithms/practice/:algorithmId/notes (PUT)', () => {
    it('should update algorithm notes', async () => {
      // Create a test template and user data
      const template = await prismaService.algorithmTemplate.create({
        data: {
          ...mockTemplate,
          tags: mockTemplate.tags,
          files: JSON.stringify(mockTemplate.files),
        },
      });

      await prismaService.algorithmUserData.create({
        data: {
          userId: 'test-user',
          algorithmId: template.id,
          notes: 'old notes',
          scheduleData: JSON.stringify({
            due: new Date(),
            stability: 4,
            difficulty: 0,
            elapsedDays: 0,
            scheduledDays: 0,
            reps: 0,
            lapses: 0,
            state: 0,
            lastReview: new Date(),
          }),
        },
      });

      await request(app.getHttpServer())
        .put(`/api/v1/algorithms/practice/${template.id}/notes`)
        .set('user-id', 'test-user')
        .send({ notes: 'new notes' })
        .expect(200);

      const userData = await prismaService.algorithmUserData.findUnique({
        where: {
          userId_algorithmId: {
            userId: 'test-user',
            algorithmId: template.id,
          },
        },
      });

      expect(userData?.notes).toBe('new notes');
    });
  });
});
