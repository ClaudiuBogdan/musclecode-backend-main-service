# ADR 002: Algorithm Data Model Refactoring

## Status

Accepted

## Context

The algorithm module needed to handle different use cases:
1. Algorithm templates that are shared across all users
2. User-specific algorithm data like notes
3. Daily algorithm assignments and completion tracking
4. Algorithm submissions

The original implementation mixed these concerns in a single model, making it difficult to:
- Separate shared data from user-specific data
- Track daily algorithm progress
- Manage user submissions efficiently
- Scale the application as new features are added

## Decision

We have decided to split the algorithm data model into four distinct entities:

1. **AlgorithmTemplate**
   - Contains the core, shared algorithm data
   - Includes title, description, category, difficulty, tags, and files
   - Immutable for regular users, managed by admins

2. **AlgorithmUserData**
   - Stores user-specific data for an algorithm
   - Contains notes and other user-specific fields
   - One-to-one relationship with user and algorithm

3. **DailyAlgorithm**
   - Tracks daily algorithm assignments
   - Records completion status
   - Links user, algorithm, and date

4. **AlgorithmSubmission**
   - Records individual submission attempts
   - Stores code, language, and time spent
   - Maintains submission history

## Database Schema Changes

```prisma
model AlgorithmTemplate {
  id          String   @id @default(uuid())
  title       String
  category    String
  summary     String
  description String
  difficulty  String
  tags        String   // JSON string
  files       String   // JSON string
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userAlgorithms AlgorithmUserData[]
  dailyAlgorithms DailyAlgorithm[]
}

model AlgorithmUserData {
  id          String    @id @default(uuid())
  userId      String
  algorithmId String
  notes       String?
  createdAt   DateTime  @default(now())
  algorithm   AlgorithmTemplate @relation(fields: [algorithmId], references: [id])
}

model DailyAlgorithm {
  id          String    @id @default(uuid())
  userId      String
  algorithmId String
  date        DateTime
  completed   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  algorithm   AlgorithmTemplate @relation(fields: [algorithmId], references: [id])
}

model Submission {
  id          String   @id @default(uuid())
  userId      String
  algorithmId String
  code        String
  language    String
  timeSpent   Int
  createdAt   DateTime @default(now())
}
```

## API Changes

The API has been reorganized into logical groups:

1. Template Management (`/api/v1/algorithms/templates/...`)
   - CRUD operations for algorithm templates
   - Admin-only access for modifications

2. User Data Management (`/api/v1/algorithms/user-data/...`)
   - User-specific operations
   - Notes management

3. Daily Algorithms (`/api/v1/algorithms/daily/...`)
   - Daily algorithm assignment
   - Completion tracking

4. Submissions (`/api/v1/algorithms/submissions/...`)
   - Submission creation and retrieval
   - Submission history

5. Combined Data (`/api/v1/algorithms/:algorithmId/progress`)
   - Aggregated view of user progress
   - Combines template, user data, and daily status

## Consequences

### Positive

1. **Clear Separation of Concerns**
   - Each entity has a single responsibility
   - Easier to maintain and extend
   - Better data organization

2. **Improved Data Access Patterns**
   - Efficient querying for specific use cases
   - Reduced data duplication
   - Better performance

3. **Enhanced Scalability**
   - Easy to add new user-specific features
   - Better support for future requirements
   - Improved data consistency

4. **Better Security**
   - Clear separation between admin and user operations
   - Protected shared data
   - Proper access control

### Negative

1. **Increased Complexity**
   - More models to maintain
   - More complex relationships
   - Additional API endpoints

2. **Migration Effort**
   - Need to migrate existing data
   - Update client applications
   - Retrain development team

3. **Performance Considerations**
   - Multiple queries for combined data
   - Additional joins in some cases
   - More complex caching strategy

## Mitigation Strategies

1. **Performance**
   - Implement efficient indexing
   - Use composite queries where possible
   - Cache frequently accessed data

2. **Migration**
   - Create detailed migration scripts
   - Implement backward compatibility
   - Phase the rollout

3. **Complexity**
   - Document the new structure thoroughly
   - Create helper functions for common operations
   - Implement proper error handling

## References

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [REST API Best Practices](https://restfulapi.net/) 