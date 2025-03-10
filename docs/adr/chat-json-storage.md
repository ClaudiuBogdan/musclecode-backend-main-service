# ADR: Chat Message Storage as JSON

## Status

Accepted

## Context

We needed to implement a chat system with the following requirements:
1. Store conversation threads between users and an AI assistant
2. Support message branching (conversation trees)
3. Ability to stream AI responses in real-time
4. Implement voting on messages
5. Integration with OpenAI's API for responses

Two main implementation options were considered:
1. Traditional relational model with separate tables for threads and messages
2. JSON-based approach with messages stored as a JSON array within the thread record

## Decision

We decided to implement the chat system using a JSON-based approach, storing messages as a JSON array within the ChatThread model, rather than creating a separate ChatMessage table.

The ChatThread model includes:
- Basic thread metadata (id, userId, algorithmId, timestamps)
- A `messages` field that stores an array of message objects as JSON

Each message in the JSON array contains:
- id: A unique identifier for the message
- content: The text content of the message
- timestamp: When the message was created
- sender: Either "user" or "assistant"
- status: The message status ("pending", "streaming", "complete", "error")
- parentId: Reference to parent message (for branching conversations)
- votes: Upvotes and downvotes data

## Rationale

The JSON-based approach provides several advantages:

1. **Simplified data retrieval**: Getting an entire conversation requires only one database query instead of multiple queries to join tables.

2. **Flexibility**: The message schema can evolve without database migrations.

3. **Performance**: Reading and writing entire threads at once is more efficient for our use case where messages are typically accessed in the context of their thread.

4. **Atomic updates**: Changes to messages within a thread can be made atomically, ensuring consistency.

5. **Simpler implementation**: Fewer database tables and relationships to manage.

## Consequences

### Positive

- Simpler API implementation for retrieving and updating conversations
- Faster development cycles due to more flexible schema
- Potential performance improvements for common operations

### Negative

- Limited ability to query individual messages across threads
- Potential issues if individual threads grow very large (thousands of messages)
- Some database features like foreign key constraints aren't available

## Implementation Notes

- We use PostgreSQL's JSONB type for efficient JSON storage and querying
- We handle message tree traversal and branching in the application layer
- The implementation supports both regular and streaming API responses
- For large-scale deployments, consider sharding or archiving old threads 