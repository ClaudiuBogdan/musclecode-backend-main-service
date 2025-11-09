import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import type { DecodedToken } from '../interfaces/decoded-token.interface';

@Injectable()
export class KeycloakService implements OnModuleInit {
  private publicKey: string | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.fetchPublicKey();
  }

  private buildRealmUrl(baseUrl: string, realm: string): string {
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return new URL(`realms/${realm}`, normalizedBaseUrl).toString();
  }

  private async fetchPublicKey(): Promise<void> {
    const realm = this.configService.get<string>('KEYCLOAK_REALM');
    const baseUrl = this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL');

    if (!realm || !baseUrl) {
      throw new Error('Missing required Keycloak configuration');
    }

    const url = this.buildRealmUrl(baseUrl, realm);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '[unavailable]');
      throw new Error(
        `Failed to fetch Keycloak public key (status=${response.status} ${response.statusText}) from ${url}. Body: ${errorBody.slice(
          0,
          500,
        )}`,
      );
    }

    const data = (await response.json()) as { public_key: string };
    if (!data?.public_key) {
      throw new Error(
        `Keycloak realm response did not include public_key at ${url}`,
      );
    }
    this.publicKey = `-----BEGIN PUBLIC KEY-----\n${data.public_key}\n-----END PUBLIC KEY-----`;
  }

  async verifyToken(token: string): Promise<DecodedToken> {
    if (!this.publicKey) {
      await this.fetchPublicKey();
    }

    try {
      if (!this.publicKey) {
        throw new Error('Public key not available');
      }

      return jwt.verify(token, this.publicKey, {
        algorithms: ['RS256'],
      }) as DecodedToken;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserInfo(token: string): Promise<unknown> {
    const realm = this.configService.get<string>('KEYCLOAK_REALM');
    const baseUrl = this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL');

    if (!realm || !baseUrl) {
      throw new Error('Missing required Keycloak configuration');
    }

    const response = await fetch(
      `${baseUrl}/realms/${realm}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException('Failed to fetch user info');
    }

    return response.json();
  }
}
