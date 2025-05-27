# Permission Module

This module handles content node permissions with clear separation between admin and user operations.

## Key Concepts

### Admin Operations
- **Purpose**: Manage explicit permissions on content nodes
- **Scope**: Only direct/explicit permissions (no inheritance)
- **Access**: Requires MANAGE or OWNER permission on the content node

### User Operations  
- **Purpose**: Check user's effective permissions
- **Scope**: Includes permission inheritance from parent nodes
- **Logic**: 
  1. Check explicit permissions on the target node
  2. If none found, recursively check parent nodes
  3. Return null if no permissions found

## API Endpoints

### Admin Endpoints

#### Grant Permission
```
POST /permissions/admin/grant
```
Grant explicit permission to a user or group on a content node.

#### Revoke Permission
```
DELETE /permissions/admin/revoke
```
Revoke explicit permission from a user or group on a content node.

#### Update Permission
```
PUT /permissions/admin/:permissionId
```
Update an existing explicit permission.

#### Get Content Node Permissions
```
GET /permissions/admin/content-node/:contentNodeId
```
Get all explicit permissions for a content node (admin view - no inheritance).

### User Endpoints

#### Get User Permission
```
GET /permissions/user/content-node/:contentNodeId
```
Get current user's effective permission for a content node (includes inheritance).

## Permission Levels

- `VIEW` - Can view content
- `INTERACT` - Can interact with content 
- `EDIT` - Can edit content
- `MANAGE` - Can manage permissions and content
- `OWNER` - Full ownership rights

## Permission Inheritance

When checking user permissions, the system follows this logic:

1. **Direct Permissions**: Check if user has explicit permissions on the target content node
2. **Group Permissions**: Check if user belongs to groups with explicit permissions on the target node
3. **Parent Node Inheritance**: If no direct permissions, recursively check parent nodes through DEPENDENCY and EXTENDS links
4. **No Access**: Return null if no permissions found at any level

## Legacy Endpoints

The following endpoints are maintained for backward compatibility but should be avoided in new implementations:

- `POST /permissions/grant` → Use `POST /permissions/admin/grant`
- `DELETE /permissions/revoke` → Use `DELETE /permissions/admin/revoke`
- `PUT /permissions/:permissionId` → Use `PUT /permissions/admin/:permissionId`
- `GET /permissions/content-node/:contentNodeId` → Use `GET /permissions/admin/content-node/:contentNodeId`
- `GET /permissions/check/:contentNodeId` → Use `GET /permissions/user/content-node/:contentNodeId`

## Example Usage

### Admin: Grant permission to a user
```javascript
POST /permissions/admin/grant
{
  "contentNodeId": "node-123",
  "userId": "user-456", 
  "permissionLevel": "EDIT",
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

### User: Check own permissions
```javascript
GET /permissions/user/content-node/node-123

Response:
{
  "hasPermission": true,
  "permissionLevel": "EDIT"
}
``` 