import { Injectable } from '@nestjs/common';
import { Submission } from 'src/modules/submission/interfaces/submission.interface';

type UserId = string;
type AlgorithmId = string;

@Injectable()
export class SubmissionRepository {
  private inMemoryStore: {
    submissions: Map<UserId, Map<AlgorithmId, Submission[]>>;
  };

  constructor() {
    this.inMemoryStore = {
      submissions: new Map(),
    };
  }

  save(userId: string, algorithmId: string, data: Submission): void {
    const userSubmissions =
      this.inMemoryStore.submissions.get(userId) || new Map();
    const algorithmSubmissions = userSubmissions.get(algorithmId) || [];
    algorithmSubmissions.push(data);
    userSubmissions.set(algorithmId, algorithmSubmissions);
    this.inMemoryStore.submissions.set(userId, userSubmissions);
  }

  get(userId: string, algorithmId: string): Submission[] {
    const userSubmissions = this.inMemoryStore.submissions.get(userId);
    if (!userSubmissions) return [];
    const algorithmSubmissions = userSubmissions.get(algorithmId);
    if (!algorithmSubmissions) return [];
    return algorithmSubmissions;
  }
}
