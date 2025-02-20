# ADR 0003: Onboarding Flow Implementation

## Status
Accepted

## Context
We need to implement a user onboarding flow to help new users understand the platform's functionality, assess their algorithmic knowledge, and provide personalized recommendations for their learning journey.

## Decision
We will implement a multi-step onboarding flow with the following components:

1. **Data Model**:
   - `UserOnboarding`: Tracks onboarding progress and state
   - `UserGoals`: Stores user's learning objectives and preferences
   - `QuizResults`: Records quiz performance and recommendations
   - `OnboardingQuizQuestion`: Maintains a bank of assessment questions

2. **Flow Steps**:
   - Welcome & Platform Introduction
   - Core Concepts (Spaced Repetition & Active Recall)
   - User Goals Collection
   - Knowledge Assessment Quiz
   - Personalized Recommendations

3. **Personalization Features**:
   - Dynamic quiz difficulty based on user's experience level
   - Personalized daily algorithm count based on available study time
   - Topic recommendations based on quiz performance
   - Customized study plan with weekly milestones

4. **Technical Implementation**:
   - NestJS module architecture for clean separation of concerns
   - Prisma for type-safe database operations
   - JWT authentication for secure user identification
   - Swagger documentation for API endpoints

## Consequences

### Positive
- Structured onboarding improves user understanding and engagement
- Personalized recommendations increase user success rate
- Modular architecture allows easy updates to onboarding content
- Type-safe implementation reduces runtime errors
- Clear separation of concerns makes maintenance easier

### Negative
- Additional database tables increase complexity
- Need to maintain quiz question bank
- Must ensure quiz questions stay relevant as platform evolves

## Implementation Notes

1. **Database Migrations**:
   ```sql
   -- Required Prisma migrations for new models
   -- UserOnboarding, UserGoals, QuizResults, OnboardingQuizQuestion
   ```

2. **API Endpoints**:
   ```
   GET  /onboarding         - Get current onboarding state
   PATCH /onboarding       - Update onboarding progress
   POST  /onboarding/goals - Save user goals
   POST  /onboarding/quiz  - Submit quiz answers
   ```

3. **Quiz System**:
   - Questions categorized by topic and difficulty
   - Adaptive selection based on user's experience level
   - Immediate feedback with explanations
   - Score calculation with topic-wise analysis

4. **Recommendation Engine**:
   - Analyzes quiz performance by topic
   - Considers user's available study time
   - Generates personalized study plan
   - Suggests optimal daily algorithm count

## References
- [Spaced Repetition Research](https://www.gwern.net/Spaced-repetition)
- [Active Recall Studies](https://www.sciencedirect.com/science/article/abs/pii/S0360131592001427)
- [NestJS Best Practices](https://docs.nestjs.com/) 