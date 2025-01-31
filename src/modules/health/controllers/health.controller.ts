import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@ApiTags('Health')
@Controller('healthz')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Check service health' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service is healthy',
    type: Object,
  })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
