import { Type } from 'class-transformer';
import { IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';

export class InteractionDataDto {
  @IsUUID()
  id: string;

  @IsString()
  type: string;

  @IsObject()
  data: Record<string, any>;
}

export class InteractionRequestDto {
  @IsUUID()
  nodeId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => InteractionDataDto)
  interaction: InteractionDataDto;
}
