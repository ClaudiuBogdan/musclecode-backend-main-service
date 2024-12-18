import { Submission } from 'src/modules/submission/interfaces/submission.interface';

export interface ISubmissionRepository {
  save(userId: string, algorithmId: string, data: Submission): Promise<void>;
  get(userId: string, algorithmId: string): Promise<Submission[]>;
}
