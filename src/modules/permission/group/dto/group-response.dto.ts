import { ApiProperty } from '@nestjs/swagger';
import { GroupRole } from '@prisma/client';

export class GroupMemberResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: GroupRole })
  role: GroupRole;

  @ApiProperty()
  joinedAt: Date;
}

export class GroupResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [GroupMemberResponseDto], required: false })
  members?: GroupMemberResponseDto[];
}
