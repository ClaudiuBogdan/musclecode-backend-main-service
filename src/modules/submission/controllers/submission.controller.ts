import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { Submission } from '../interfaces/submission.interface';
import { User } from '../../auth/decorators/user.decorator';
import { UserContext } from '../../auth/interfaces/user-context.interface';

@Controller('api/v1/algorithms')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':id/submissions')
  async createSubmission(
    @Param('id') algorithmId: string,
    @Body() submissionData: Submission,
    @User('id') userId: string,
  ): Promise<{ success: boolean }> {
    await this.submissionService.createSubmission(
      userId,
      algorithmId,
      submissionData,
    );
    return { success: true };
  }

  @Get(':id/submissions')
  getSubmissions(
    @Param('id') algorithmId: string,
    @User('id') userId: string,
  ): Promise<Submission[]> {
    return this.submissionService.getSubmissions(userId, algorithmId);
  }
}
