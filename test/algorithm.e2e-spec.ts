import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infrastructure/database/prisma.service';
import {
  AlgorithmTemplate,
  AlgorithmFileType,
  CodeLanguage,
  AlgorithmRating,
} from '../src/modules/algorithm/interfaces/algorithm.interface';
import { AuthGuard } from '../src/modules/auth/guards/auth.guard';
import { RolesGuard } from '../src/modules/auth/guards/roles.guard';

describe('Algorithm E2E Tests', () => {
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
      imports: [AppModule],
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

  describe('Complete Algorithm Flow', () => {
    it('should handle the complete algorithm practice flow', async () => {
      // Step 1: Create a new algorithm template
      const createResponse = await request(app.getHttpServer())
        .post('/api/v1/algorithms/templates')
        .send({
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
        })
        .expect(201);

      const templateId = createResponse.body.id;

      // Step 2: Get daily algorithms and verify the new template is included
      const dailyResponse = await request(app.getHttpServer())
        .get('/api/v1/algorithms/daily')
        .set('user-id', 'test-user')
        .expect(200);

      expect(dailyResponse.body.some((alg: any) => alg.id === templateId)).toBe(
        true,
      );

      // Step 3: Get practice data for the algorithm
      await request(app.getHttpServer())
        .get(`/api/v1/algorithms/practice/${templateId}`)
        .set('user-id', 'test-user')
        .expect(200);

      // Step 4: Submit a solution
      await request(app.getHttpServer())
        .post(`/api/v1/algorithms/practice/${templateId}/submissions`)
        .set('user-id', 'test-user')
        .send({
          code: 'function solution() { return true; }',
          language: CodeLanguage.TYPESCRIPT,
          rating: AlgorithmRating.GOOD,
          timeSpent: 300,
        })
        .expect(201);

      // Step 5: Add notes to the algorithm
      await request(app.getHttpServer())
        .put(`/api/v1/algorithms/practice/${templateId}/notes`)
        .set('user-id', 'test-user')
        .send({ notes: 'This was a good learning experience' })
        .expect(200);

      // Step 6: Verify the final state
      const finalResponse = await request(app.getHttpServer())
        .get(`/api/v1/algorithms/practice/${templateId}`)
        .set('user-id', 'test-user')
        .expect(200);

      expect(finalResponse.body.notes).toBe(
        'This was a good learning experience',
      );
      expect(finalResponse.body.submissions).toHaveLength(1);
      expect(finalResponse.body.submissions[0].rating).toBe(
        AlgorithmRating.GOOD,
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle non-existent algorithm access', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/algorithms/practice/non-existent')
        .set('user-id', 'test-user')
        .expect(404);
    });

    it('should handle invalid submission data', async () => {
      const template = await prismaService.algorithmTemplate.create({
        data: {
          ...mockTemplate,
          tags: mockTemplate.tags,
          files: JSON.stringify(mockTemplate.files),
        },
      });

      await request(app.getHttpServer())
        .post(`/api/v1/algorithms/practice/${template.id}/submissions`)
        .set('user-id', 'test-user')
        .send({
          // Missing required fields
          code: 'function solution() { return true; }',
        })
        .expect(400);
    });

    it('should handle unauthorized access', async () => {
      // Temporarily disable auth guard
      mockAuthGuard.canActivate.mockImplementationOnce(() => false);

      await request(app.getHttpServer())
        .get('/api/v1/algorithms/templates')
        .expect(401);
    });

    it('should handle unauthorized admin operations', async () => {
      // Temporarily disable roles guard
      mockRolesGuard.canActivate.mockImplementationOnce(() => false);

      await request(app.getHttpServer())
        .post('/api/v1/algorithms/templates')
        .send(mockTemplate)
        .expect(403);
    });
  });

  describe('Performance Tests', () => {
    it('should handle multiple concurrent requests', async () => {
      // Create multiple templates
      const templates = await Promise.all(
        Array(10)
          .fill(null)
          .map((_, i) =>
            prismaService.algorithmTemplate.create({
              data: {
                ...mockTemplate,
                id: `test-id-${i}`,
                title: `Test Algorithm ${i}`,
                tags: mockTemplate.tags,
                files: JSON.stringify(mockTemplate.files),
              },
            }),
          ),
      );

      // Make concurrent requests
      const requests = templates.map((template: any) =>
        request(app.getHttpServer())
          .get(`/api/v1/algorithms/practice/${template.id}`)
          .set('user-id', 'test-user'),
      );

      const responses = await Promise.all(requests);
      responses.forEach((response: any) => expect(response.status).toBe(200));
    });

    it('should handle large data sets', async () => {
      // Create 100 templates
      await Promise.all(
        Array(100)
          .fill(null)
          .map((_, i) =>
            prismaService.algorithmTemplate.create({
              data: {
                ...mockTemplate,
                id: `test-id-${i}`,
                title: `Test Algorithm ${i}`,
                tags: mockTemplate.tags,
                files: JSON.stringify(mockTemplate.files),
              },
            }),
          ),
      );

      const response = await request(app.getHttpServer())
        .get('/api/v1/algorithms/templates')
        .expect(200);

      expect(response.body).toHaveLength(100);
    });
  });
});
