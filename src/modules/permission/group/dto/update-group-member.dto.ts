import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GroupRole } from '@prisma/client';

export class UpdateGroupMemberDto {
  @ApiProperty({
    description: 'New role for the user in the group',
    enum: GroupRole,
  })
  @IsEnum(GroupRole)
  role: GroupRole;
}
