import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserContext } from '../interfaces/user-context.interface';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AuthService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async validateUser(token: string): Promise<UserContext> {
    try {
      const userInfoRaw = await this.keycloakService.getUserInfo(token);

      if (!userInfoRaw) {
        throw new UnauthorizedException('User not found');
      }

      const userInfo = userInfoRaw as {
        sub: string;
        email: string;
        realm_access?: { roles: string[] };
      };

      return {
        id: userInfo.sub,
        email: userInfo.email,
        roles: userInfo.realm_access?.roles || [],
      };
    } catch (error: unknown) {
      console.error('User validation failed:', error);
      throw new UnauthorizedException('Invalid user credentials');
    }
  }
}
