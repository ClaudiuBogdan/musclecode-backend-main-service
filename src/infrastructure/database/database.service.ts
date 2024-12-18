import { Injectable } from '@nestjs/common';
import { SubmissionRepository } from './repository/submission.service';

@Injectable()
export class DatabaseService {
  constructor(public readonly submissions: SubmissionRepository) {}
}
