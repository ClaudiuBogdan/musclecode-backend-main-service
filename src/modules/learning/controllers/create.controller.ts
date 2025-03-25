import { Controller, Post } from '@nestjs/common';

@Controller('learning/create')
export class CreateController {
  constructor() {}

  @Post('module')
  async createModule() {}
}
