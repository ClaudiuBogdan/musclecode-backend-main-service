# AI-Powered Algorithm Collection Generation

This module provides AI capabilities for generating collections of coding challenges and lessons that help users learn programming concepts through practical implementations.

## Features

- **Algorithm Collection Outline Generation**: Creates structured collections of related coding challenges
- **Individual Algorithm Generation**: Produces detailed algorithm templates, tests, and solutions
- **Interactive Learning Content**: Generates educational lessons with theory, examples, and quizzes
- **Multi-language Support**: Creates coding challenges in various programming languages
- **Test-Driven Development**: Includes test files to verify algorithm implementations

## Architecture

The algorithm generation system uses a two-step process:

```
┌─────────────────────┐       ┌────────────────────┐
│  Collection Outline │       │ Algorithm Template │
│   Generation Agent  │───────▶│  Generation Agent │
└─────────────────────┘       └────────────────────┘
          │                             │
          │                             │
          ▼                             ▼
┌──────────────────────────────────────────────────┐
│             Algorithm Education Service           │
└──────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────┐
│           Algorithm Education Controller          │
└──────────────────────────────────────────────────┘
```

## API Endpoints

### Generate Algorithm Collection Outline

```
POST /education/algorithms/collection/outline
```

Generates a collection outline with a series of algorithm challenges based on a topic.

**Request body**:
```json
{
  "topic": "Lodash Functions for Frontend Developers",
  "language": "JavaScript",
  "categories": ["frontend", "utility functions"],
  "difficulty": "beginner",
  "count": 5,
  "focusAreas": ["Array methods", "Object manipulation"],
  "additionalRequirements": "Focus on practical examples relevant to modern web development"
}
```

**Response**: A structured collection outline with algorithms previews.

### Generate Full Algorithm Collection

```
POST /education/algorithms/collection/generate
```

Generates all algorithm templates for a collection based on a previously generated outline.

**Request body**:
```json
{
  "collectionOutline": {
    "name": "Lodash Utility Functions",
    "description": "A collection of coding challenges to learn Lodash utility functions",
    "algorithms": [
      {
        "title": "Array Chunking with _.chunk",
        "summary": "Learn how to split arrays into groups of specified size",
        "difficulty": "beginner",
        "categories": ["arrays", "lodash", "utility"]
      }
    ]
  },
  "language": "javascript"
}
```

**Response**: An array of complete algorithm templates with code files and lessons.

### Generate Single Algorithm Template

```
POST /education/algorithms/template/generate
```

Generates a single algorithm template from a collection outline.

**Request body**:
```json
{
  "collectionOutline": {
    "name": "Lodash Utility Functions",
    "description": "A collection of coding challenges to learn Lodash utility functions",
    "algorithms": [
      {
        "title": "Array Chunking with _.chunk",
        "summary": "Learn how to split arrays into groups of specified size",
        "difficulty": "beginner",
        "categories": ["arrays", "lodash", "utility"]
      }
    ]
  },
  "algorithmIndex": 0,
  "language": "javascript"
}
```

**Response**: A complete algorithm template with code files and lessons.

## Algorithm Template Structure

Each generated algorithm includes:

1. **Challenge Files**:
   - Template file with placeholder code for the user to complete
   - Solution file with a complete implementation
   - Test file to verify the user's solution

2. **Educational Content**:
   - Theory lessons explaining key concepts
   - Step-by-step implementation guides
   - Quiz questions to test understanding
   - Code examples showing different approaches

3. **Metadata**:
   - Difficulty rating
   - Categories and tags
   - Learning prerequisites
   - Estimated completion time

## Integration with Database

The generated algorithm templates can be stored in the database using the `AlgorithmTemplate` schema. The service provides a `convertToDatabaseFormat` method that transforms the generated algorithms into the correct format for storage.

## Example Usage Flow

1. Generate a collection outline based on a topic (e.g., "Lodash Functions")
2. Review and optionally modify the outline
3. Generate all algorithm templates for the collection
4. Store the generated algorithms and collection in the database
5. Present the challenges to users through the application interface 