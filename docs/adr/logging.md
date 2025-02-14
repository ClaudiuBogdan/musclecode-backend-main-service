# Structured Logging Guidelines

This document outlines our approach to structured logging in our NestJS application.

## Core Principles

1. Log **why** something happened, not just what happened
2. Use static event types for identical events
3. Keep `extraInfo` small and PII-free (no personally identifiable information)
4. Leverage OpenTelemetry context instead of duplicate fields
5. Automatically track user context through async local storage

## Logger Implementation

The `StructuredLogger` extends NestJS's `ConsoleLogger` and uses Winston for structured logging:

```typescript
@Injectable()
export class StructuredLogger extends ConsoleLogger {
  debug(message: string, extraInfo?: string | Record<string, any>): void;
  log(message: string, extraInfo?: string | Record<string, any>): void;
  warn(message: string, extraInfo?: string | Record<string, any>): void;
  error(
    message: string,
    traceDetails?: string,
    extraInfo?: string | Record<string, any>,
  ): void;
}
```

## Automatic Context Enrichment

The logger automatically enriches logs with:
- User ID from async local storage
- Context name (typically the class/module name)
- OpenTelemetry attributes

```typescript
// Example usage in a service
@Injectable()
export class UserService {
  private readonly logger = new StructuredLogger(UserService.name);

  async createUser() {
    this.logger.log("User Creation Started", { 
      provider: "email" 
    });
  }
}
```

## Strategic Logging Examples

### API Calls
```typescript
// ✅ Good - Static event type with structured context
logger.log("API Request Started", {
  endpoint: "/user/profile",
  method: "GET"
});

logger.debug("Cache Miss", { 
  key: "user:123",
  ttl: "300s" 
});

// Error handling with stack trace
try {
  await fetchData();
} catch (error) {
  logger.error(
    "API Request Failed",
    error.stack,
    {
      retryCount: 3,
      statusCode: error.response?.status
    }
  );
}
```

### User Actions
```typescript
// ✅ Good - Essential context only
logger.log("Login Attempt", {
  provider: "google",
  deviceType: "mobile"
});

// ✅ Good - Targeted validation info
logger.log("Settings Updated", {
  changedFields: ["theme", "notifications"],
  validationErrors: 0
});
```

## Log Levels

- **DEBUG**: Cache operations, conditional branches, non-critical warnings
- **LOG/INFO**: User-initiated actions, state changes, API lifecycle events  
- **WARN**: Potential issues that don't prevent operation
- **ERROR**: Unhandled exceptions, failed retries, critical service outages

## Anti-Patterns to Avoid

```typescript
// ❌ Bad - Dynamic message string
logger.log(`User ${userId} logged in`);
// ✅ Good - Static event type with structured data
logger.log("User Logged In", { userId });

// ❌ Bad - High cardinality, potentially sensitive data
logger.debug("State Update", { fullState: store.getState() });
// ✅ Good - Essential context only
logger.debug("State Changed", { 
  changedKeys: ["theme", "language"]
});

// ❌ Bad - Free-form text in extraInfo
logger.log("API Error", { 
  details: `Failed to load user data for ${email}` 
});
// ✅ Good - Structured error data
logger.error(
  "API Request Failed",
  error.stack,
  {
    operation: "loadUserData",
    statusCode: 404
  }
);

// ❌ Bad - Large objects, high cardinality
logger.log("User Action", { userData: userObject });
// ✅ Good - Selected relevant fields
logger.log("User Profile Updated", {
  updatedFields: ["displayName", "avatar"]
});
```

## Key Benefits

1. Automatic user context tracking through async local storage
2. NestJS integration with Winston structured logging
3. Enforced structured messages without string interpolation
4. Proper error logging with stack traces
5. Module-specific context through constructor injection
6. Limited extraInfo to essential context
7. Clean shutdown through `onModuleDestroy`