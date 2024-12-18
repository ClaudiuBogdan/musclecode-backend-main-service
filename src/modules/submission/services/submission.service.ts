import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../infrastructure/database/database.service';
import { Submission } from '../interfaces/submission.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubmissionService {
  constructor(private readonly dbService: DatabaseService) {}

  createSubmission(
    userId: string,
    algorithmId: string,
    submissionData: Submission,
  ): Submission {
    const submission: Submission = {
      id: uuidv4(),
      userId,
      algorithmId,
      timeSpent: submissionData.timeSpent,
      code: submissionData.code,
      language: submissionData.language,
      notes: submissionData.notes,
      difficulty: submissionData.difficulty,
      createdAt: new Date().toISOString(),
    };

    this.dbService.submissions.save(userId, algorithmId, submission);
    return submission;
  }

  getSubmissions(userId: string, algorithmId: string): Promise<Submission[]> {
    return this.dbService.submissions.get(userId, algorithmId);
  }
}
