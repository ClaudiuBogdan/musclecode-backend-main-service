export interface KeycloakUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  createdTimestamp: number;
}

export interface UserWithPermission {
  id: string;
  name: string;
  email: string;
  permissionId: string;
  permissionLevel: string;
}

export interface UserBasicInfo {
  id: string;
  name: string;
  email: string;
}
