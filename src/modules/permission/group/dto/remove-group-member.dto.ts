import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveGroupMemberDto {
  @ApiProperty({ description: 'User ID to remove from the group' })
  @IsString()
  userId: string;
}
