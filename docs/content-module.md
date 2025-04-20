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

## DTO Structure

### CreateModuleDto
```typescript
{
  description?: string;
  status?: ContentStatus;
  body?: Record<string, any>;
  metadata?: Record<string, any>;
}
```

### CreateLessonDto
```typescript
{
  moduleId: string;
  description?: string;
  status?: ContentStatus;
  body?: Record<string, any>;
  metadata?: Record<string, any>;
}
```

### CreateExerciseDto
```typescript
{
  moduleId: string;
  lessonId?: string;
  description?: string;
  status?: ContentStatus;
  body?: Record<string, any>;
  metadata?: Record<string, any>;
}
```

### EditContentNodeDto
```typescript
{
  status?: ContentStatus;
  body?: Record<string, any>;
  metadata?: Record<string, any>;
}
```

## Entity Classes

The service returns typed entity objects rather than raw database models:

### ModuleEntity
Represents a module with its properties.

### LessonEntity
Represents a lesson with a reference to its parent module.

### ExerciseEntity
Represents an exercise with references to its parent module and optionally a lesson. 