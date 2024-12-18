import { Injectable } from '@nestjs/common';
import { SubmissionRepository } from './repository/submissions/submission.repository';

@Injectable()
export class DatabaseService {
  constructor(public readonly submissions: SubmissionRepository) {}
}
