import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GroupRole } from '@prisma/client';

export class AddGroupMemberDto {
  @ApiProperty({ description: 'User ID to add to the group' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Role for the user in the group',
    enum: GroupRole,
    default: GroupRole.MEMBER,
    required: false,
  })
  @IsOptional()
  @IsEnum(GroupRole)
  role?: GroupRole;
}
