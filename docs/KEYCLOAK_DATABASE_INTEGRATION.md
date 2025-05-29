# Keycloak Database Integration

This document explains the Keycloak database integration feature that allows the permission service to fetch user information directly from Keycloak's PostgreSQL database.

## Overview

The system can optionally connect to Keycloak's database to enrich user data in permission responses. If the database connection is not available or not configured, the system will fall back to using user IDs as names and emails.

## Configuration

### Environment Variable

Add the following environment variable to enable Keycloak database integration:

```bash
KEYCLOAK_DATABASE_URL=postgresql://keycloak_user:password@keycloak-db:5432/keycloak
```

### SSL Configuration

For SSL connections, append `?sslmode=require` to the connection string:

```bash
KEYCLOAK_DATABASE_URL=postgresql://keycloak_user:password@keycloak-db:5432/keycloak?sslmode=require
```

## Behavior

### When `KEYCLOAK_DATABASE_URL` is provided:
- The system will attempt to connect to the Keycloak database on startup
- User information (name, email) will be fetched from the `user_entity` table
- If the database is unavailable or user not found, it falls back to using the user ID

### When `KEYCLOAK_DATABASE_URL` is not provided:
- The system will log a warning and skip database integration
- User names and emails will default to the user ID
- All other functionality remains the same

## Database Schema

The system expects the following Keycloak database schema:

```sql
-- user_entity table (standard Keycloak table)
CREATE TABLE user_entity (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    enabled BOOLEAN
);
```

## User Data Enrichment

The permission service uses the following logic to create user display names:

1. If both `first_name` and `last_name` are available: "First Last"
2. If only `first_name` is available: "First"
3. If only `last_name` is available: "Last"
4. If neither name is available: falls back to `username`
5. If database connection fails: falls back to user ID

## Error Handling

- Database connection failures are logged but don't break the application
- Individual user lookup failures are logged and fall back to user IDs
- The service gracefully degrades when the database is unavailable

## Security Considerations

1. **Database Credentials**: Store the database URL securely using environment variables or secret management
2. **Read-Only Access**: The service only performs SELECT queries; grant minimal required permissions
3. **Connection Pooling**: The service uses connection pooling to manage database connections efficiently
4. **SSL/TLS**: Use SSL connections in production environments

## Monitoring

The service logs the following events:

- Successful database connection establishment
- Database connection failures
- Individual user lookup failures
- Service initialization status

## Example Usage

After configuring the environment variable, the permission service will automatically enrich user data:

```json
{
  "contentNodeId": "123",
  "permissions": [...],
  "sharing": {
    "users": [
      {
        "id": "user-uuid",
        "name": "John Doe",           // Fetched from Keycloak DB
        "email": "john@example.com",  // Fetched from Keycloak DB
        "permissionId": "perm-123",
        "permissionLevel": "READ"
      }
    ]
  }
}
```

Without the database connection, the response would be:

```json
{
  "contentNodeId": "123",
  "permissions": [...],
  "sharing": {
    "users": [
      {
        "id": "user-uuid",
        "name": "user-uuid",     // Fallback to user ID
        "email": "user-uuid",    // Fallback to user ID
        "permissionId": "perm-123",
        "permissionLevel": "READ"
      }
    ]
  }
}
``` 