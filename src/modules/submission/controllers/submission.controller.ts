import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { Submission } from '../interfaces/submission.interface';
import { CurrentUser } from '../../auth/decorators/user.decorator';
import { UserContext } from '../../auth/interfaces/user-context.interface';

@Controller('api/v1/algorithms')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':id/submissions')
  async createSubmission(
    @Param('id') algorithmId: string,
    @Body() submissionData: Submission,
    @CurrentUser() user: UserContext,
  ): Promise<{ success: boolean }> {
    await this.submissionService.createSubmission(
      user.id,
      algorithmId,
      submissionData,
    );
    return { success: true };
  }

  @Get(':id/submissions')
  getSubmissions(
    @Param('id') algorithmId: string,
    @CurrentUser() user: UserContext,
  ): Promise<Submission[]> {
    return this.submissionService.getSubmissions(user.id, algorithmId);
  }
}
