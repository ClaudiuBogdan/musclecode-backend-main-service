import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Algorithm } from '../interfaces/algorithm.interface';
import { AlgorithmService } from '../services/algorithm.service';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';

@ApiTags('Algorithms')
@Controller('api/v1/algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Get()
  @ApiOperation({ summary: 'Get all algorithms' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all algorithms',
    type: [Algorithm],
  })
  async findAll(): Promise<Algorithm[]> {
    return this.algorithmService.findAll();
  }

  @Get('daily')
  @ApiOperation({ summary: 'Get daily algorithms' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns daily algorithms',
    type: [Algorithm],
  })
  async findDaily(): Promise<Algorithm[]> {
    return this.algorithmService.findDaily();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get algorithm by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Algorithm ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the algorithm',
    type: Algorithm,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Algorithm not found',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<{ algorithm: Algorithm } | null> {
    return this.algorithmService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard) //
  @Roles('admin')
  // @ApiBearerAuth() // TODO: add bearer auth
  @ApiOperation({ summary: 'Create a new algorithm' })
  @ApiBody({ type: CreateAlgorithmDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Algorithm created successfully',
    type: Algorithm,
  })
  async create(
    @Body(new ValidationPipe()) createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<Algorithm> {
    return this.algorithmService.create(createAlgorithmDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an algorithm' })
  @ApiParam({ name: 'id', type: 'string', description: 'Algorithm ID' })
  @ApiBody({ type: UpdateAlgorithmDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Algorithm updated successfully',
    type: Algorithm,
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<Algorithm> {
    return this.algorithmService.update(id, updateAlgorithmDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an algorithm' })
  @ApiParam({ name: 'id', type: 'string', description: 'Algorithm ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Algorithm deleted successfully',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.algorithmService.delete(id);
  }
}
