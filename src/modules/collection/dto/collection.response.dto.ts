import { ApiProperty } from '@nestjs/swagger';

export class AlgorithmInCollectionDto {
  @ApiProperty({
    description: 'The ID of the algorithm',
    example: 'uuid-1',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the algorithm',
    example: 'Two Sum',
  })
  title: string;

  @ApiProperty({
    description: 'The difficulty of the algorithm',
    example: 'Easy',
  })
  difficulty: string;

  @ApiProperty({
    description: 'The categories of the algorithm',
    example: ['Arrays', 'Hash Table'],
    isArray: true,
  })
  categories: string[];

  @ApiProperty({
    description: 'The tags of the algorithm',
    example: ['tag1', 'tag2'],
    isArray: true,
  })
  tags: string[];
}

export class CollectionResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the collection',
    example: 'uuid-1',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the collection',
    example: 'Dynamic Programming Patterns',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the collection',
    example: 'A curated list of dynamic programming problems and patterns',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description:
      'The user ID who created this collection (null for system collections)',
    example: 'user-uuid-1',
    required: false,
    nullable: true,
  })
  userId: string | null;

  @ApiProperty({
    description: 'The original collection ID if this is a clone',
    example: 'original-collection-uuid',
    required: false,
    nullable: true,
  })
  parentId: string | null;

  @ApiProperty({
    description: 'When the collection was created',
    example: '2024-03-20T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The algorithms in this collection',
    type: [AlgorithmInCollectionDto],
  })
  algorithms: AlgorithmInCollectionDto[];
}

export class AlgorithmCollectionResponseDto {
  @ApiProperty({
    description: 'The ID of the algorithm',
    example: 'algorithm-uuid-1',
  })
  algorithmId: string;

  @ApiProperty({
    description: 'The ID of the collection',
    example: 'collection-uuid-1',
  })
  collectionId: string;
}
