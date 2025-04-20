# Algorithm Gateway Service - Technical Specification v2.0

## 1. Service Overview

The Algorithm Gateway Service serves as the central API gateway for the algorithm platform, implementing a robust, secure, and scalable interface between clients and backend microservices.


### 1.1 Core Responsibilities
- Algorithm management and discovery
- Daily algorithm rotation and delivery
- Secure code execution orchestration
- User submission tracking and analytics
- Authentication and authorization

### 1.2 Key Quality Attributes
- High Availability: 99.9% uptime
- Response Time: < 200ms (p95)
- Scalability: Horizontal scaling support
- Security: Zero-trust architecture
- Observability: Full request tracing

## 2. API Specifications

### 2.1 Algorithm Management

* GET /api/v1/algorithms
* GET /api/v1/algorithms/daily
* POST /api/v1/algorithms/run

## 3. Technical Architecture

### 3.1 Module Structure
```
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── decorators/
│   │   ├── api-paginated-response.decorator.ts
│   │   └── roles.decorator.ts
│   ├── filters/
│   │   ├── http-exception.filter.ts
│   │   └── validation.filter.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   ├── logging.interceptor.ts
│   │   ├── transform.interceptor.ts
│   │   └── timeout.interceptor.ts
│   └── pipes/
│       └── validation.pipe.ts
├── config/
│   ├── config.module.ts
│   ├── config.service.ts
│   └── validation-schema.ts
├── modules/
│   ├── algorithm/
│   │   ├── algorithm.module.ts
│   │   ├── algorithm.controller.ts
│   │   ├── algorithm.service.ts
│   │   ├── dto/
│   │   ├── entities/
│   │   └── repositories/
│   ├── daily-algorithm/
│   ├── execution/
│   └── submission/
├── infrastructure/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── messaging/
│   │   └── queue.service.ts
│   └── cache/
│       └── redis.service.ts
└── observability/
    ├── logger/
    ├── metrics/
    └── tracing/
```

### 3.2 Core Components

#### Database Layer
- Primary: PostgreSQL with Prisma
- Cache: Redis for frequently accessed data
- Migrations: Versioned and automated

#### Message Queue (skip this for now)
- RabbitMQ for asynchronous queries
- Dead letter queues for failed executions
- Message persistence and retry policies

#### Caching Strategy
```typescript
interface CacheConfig {
  algorithms: {
    ttl: 300; // 5 minutes
    invalidationEvents: ['algorithm.updated', 'algorithm.created'];
  };
  dailyAlgorithm: {
    ttl: 86400; // 24 hours
    invalidationEvents: ['daily.rotated'];
  };
}
```

## 4. Security Implementation

### 4.1 Authentication & Authorization
```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  // Implementation with refresh token rotation
}

@Injectable()
export class RolesGuard implements CanActivate {
  // RBAC implementation
}
```

### 4.2 Rate Limiting
```typescript
interface RateLimitConfig {
  windowMs: 15 * 60 * 1000; // 15 minutes
  max: 100; // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.';
}
```

## 5. Observability Stack

### 5.1 Logging
```typescript
interface LogEntry {
  timestamp: string;
  correlationId: string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  message: string;
  context: {
    service: string;
    method: string;
    path: string;
  };
  metadata?: Record<string, any>;
}
```

### 5.2 Metrics
- Request duration histograms
- Error rate counters
- Queue length gauges
- Resource utilization metrics

### 5.3 Tracing
- OpenTelemetry integration
- Distributed tracing across services
- Performance bottleneck identification

## 6. Testing Strategy

### 6.1 Unit Tests
```typescript
describe('AlgorithmService', () => {
  // Comprehensive unit test suite
});
```

### 6.2 Integration Tests
```typescript
describe('AlgorithmController (e2e)', () => {
  // API endpoint testing
});
```

### 6.3 Performance Tests
- Load testing scenarios
- Stress testing configurations
- Endurance testing parameters

## 7. Error Handling

### 7.1 Standard Error Response
```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
    correlationId: string;
    timestamp: string;
  };
}
```

## 8. Deployment Configuration

### 8.1 Kubernetes Resources
```yaml
# Deployment configuration with:
- Resource limits and requests
- Health check probes
- Horizontal Pod Autoscaling
- Network policies

```

# Content Module Documentation

## Overview

The Content Module provides a flexible system for creating and managing structured educational content. It follows a hierarchical model:

- **Modules** - Top level containers for educational content
- **Lessons** - Groups of related content within a module
- **Exercises** - Specific learning activities that can be linked to modules or lessons

## Data Structures

### ContentNode

The base entity representing any content item with the following properties:

- `id`: Unique identifier
- `type`: Type of the content node (MODULE, LESSON, EXERCISE, etc.)
- `status`: Current status (DRAFT, CREATED, ARCHIVED)
- `body`: Flexible JSON content (different structure for each type)
- `metadata`: Optional additional properties
- `userId`: Owner of the content

### ContentLink

Represents relationships between nodes:

- Links modules to lessons (DEPENDENCY)
- Links modules to exercises (DEPENDENCY)
- Links lessons to exercises (DEPENDENCY)

## Core Services

### ContentService

Provides high-level content management operations:

#### Module Methods

- `createModule(dto, userId)`: Creates a new module in DRAFT state
- `editModule(id, dto, userId)`: Updates an existing module
- `publishModule(id, userId)`: Changes status to CREATED for a module and all its children

#### Lesson Methods

- `createLesson(dto, userId)`: Creates a new lesson and links it to its parent module
- `editLesson(id, dto, userId)`: Updates an existing lesson

#### Exercise Methods

- `createExercise(dto, userId)`: Creates a new exercise and links it to its parent module and optionally to a lesson
- `editExercise(id, dto, userId)`: Updates an existing exercise

#### Other Methods

- `getModule(id, userId)`: Retrieves a module with all its lessons and exercises
- `createCourseDraft(courseData, userId)`: Creates a draft course from JSON data (used by AI agents)

### ContentRepository

Handles database operations for the content module:

- `createNode(data)`: Creates a new content node
- `findNodeById(id)`: Retrieves a node by ID
- `updateNode(id, data)`: Updates a content node
- `deleteNode(id)`: Removes a content node
- `linkNodes(fromId, toId, linkType)`: Creates relationships between nodes
- `findChildNodes(parentId, type)`: Finds child nodes of a specific type
- `findLinks(fromId, toId, linkType)`: Retrieves links between nodes

## Usage Flow

1. Create a module (draft state)
2. Add lessons to the module
3. Add exercises to modules and/or lessons
4. Edit content as needed
5. Publish the module to make it and all its children available

## Security

- All content operations validate user ownership
- Users can only edit or link content they own
- Permission system controls access to content nodes
