# AI-Powered Educational Content Generation Module

This module provides AI capabilities for generating comprehensive educational content through a structured, agent-based approach.

## Features

- **Course Outline Generation**: Creates structured course outlines with modules and lessons
- **Content Research**: Automatically researches topics from web sources 
- **Lesson Generation**: Creates detailed lessons with theory, code examples, and explanations
- **Exercise Creation**: Generates relevant practice exercises with solutions
- **Quiz Generation**: Creates assessment questions with explanations

## Architecture

The module follows a modular design with specialized agents:

```
┌───────────────────┐      ┌─────────────────────┐      ┌───────────────────┐
│  Course Planning  │      │  Content Research   │      │ Lesson Generation │
│       Agent       │─────▶│        Agent        │─────▶│       Agent       │
└───────────────────┘      └─────────────────────┘      └───────────────────┘
        │                                                        │
        └───────────────────┐                 ┌──────────────────┘
                          ┌─▼─────────────────▼─┐
                          │  Education Service  │
                          └─────────────────────┘
                                     │
                          ┌──────────▼───────────┐
                          │ Education Controller │
                          └──────────────────────┘
```

## API Endpoints

### Generate Course Outline

```
POST /education/course/outline
```

Generates a structured course outline based on a topic and additional requirements.

**Request body**:
```json
{
  "topic": "React Fundamentals",
  "targetAudience": ["Web developers", "Frontend engineers"],
  "difficultyLevel": "beginner",
  "learningObjectives": ["Learn React hooks", "Understand component lifecycle"],
  "additionalRequirements": "Include practical examples using the latest React 18 features"
}
```

**Response**: A structured course outline with modules and lessons

### Generate Full Course

```
POST /education/course/generate
```

Generates a complete course with detailed lessons, exercises, and quizzes based on an approved outline.

**Request body**:
```json
{
  "courseOutline": {
    "title": "Introduction to React",
    "description": "A comprehensive course on React fundamentals",
    "objectives": ["Learn React basics", "Understand component lifecycle"],
    "prerequisites": ["Basic JavaScript knowledge"],
    "modules": [
      {
        "title": "Getting Started with React",
        "description": "Introduction to React library",
        "lessons": [
          {
            "title": "What is React?",
            "description": "Introduction to React and its concepts"
          }
        ]
      }
    ]
  },
  "difficultyLevel": "beginner"
}
```

**Response**: A complete course with detailed content

## Required Environment Variables

The module requires the following environment variables:

- `OPENAI_API_KEY`: API key for OpenAI services
- `SERP_API_KEY`: API key for the SERP API for web search capabilities

## Dependencies

- LangChain for orchestrating AI capabilities
- OpenAI API for content generation
- SERP API for web research

## Implementation Details

The module leverages several AI techniques:

1. **Structured Output**: Uses prompt engineering with structured output parsing to ensure consistent data formats
2. **Web Research**: Integrates with search APIs to gather accurate, up-to-date information
3. **Chain of Thought**: Breaks down complex generation tasks into logical steps
4. **Template System**: Uses consistent templates for each type of educational content 