import { Algorithm } from './algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';

export interface IAlgorithmRepository {
  findAll(): Promise<Algorithm[]>;
  findById(id: string): Promise<Algorithm | null>;
  findDaily(): Promise<Algorithm[]>;
  create(createAlgorithmDto: CreateAlgorithmDto): Promise<Algorithm>;
  update(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<Algorithm>;
  delete(id: string): Promise<void>;
  seed(): Promise<void>;
}
