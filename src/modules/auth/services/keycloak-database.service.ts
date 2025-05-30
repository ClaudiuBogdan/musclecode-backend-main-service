import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { UserBasicInfo } from '../interfaces/user.interface';

@Injectable()
export class KeycloakDatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new StructuredLogger(KeycloakDatabaseService.name);
  private pool: Pool | null = null;
  private realmName: string | undefined;
  private isAvailable = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const databaseUrl = this.configService.get<string>('KEYCLOAK_DATABASE_URL');
    this.realmName = this.configService.get<string>('KEYCLOAK_REALM');

    if (!databaseUrl || !this.realmName) {
      this.logger.warn(
        !databaseUrl
          ? 'KEYCLOAK_DATABASE_URL not set - skipping DB integration.'
          : 'KEYCLOAK_REALM not set - skipping DB integration.',
      );
      return;
    }

    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
    });

    try {
      await this.pool.query('SELECT 1'); // smoke test
      this.isAvailable = true;
      this.logger.log('Keycloak database connection established');
    } catch (err) {
      this.logger.error('Keycloak DB connection failed:', err);
      this.pool = null;
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      try {
        await this.pool.end();
        this.logger.log('Keycloak database connection closed');
      } catch (err) {
        this.logger.error('Error closing Keycloak DB connection:', err);
      }
    }
  }

  isKeycloakDatabaseAvailable(): boolean {
    return this.isAvailable && this.pool !== null;
  }

  async getUserById(userId: string): Promise<UserBasicInfo | null> {
    if (!this.isKeycloakDatabaseAvailable() || !this.realmName) {
      this.logger.warn('DB not available – skipping getUserById');
      return null;
    }

    const text = `
    SELECT
      u.id,
      u.username,
      u.email,
      u.first_name,
      u.last_name
    FROM user_entity u
    JOIN realm r
      ON u.realm_id = r.id
    WHERE
      u.id       = $1
      AND r.name = $2
      AND u.enabled = true
  `;
    const params = [userId, this.realmName];
    try {
      const { rows } = await this.pool!.query({
        name: 'fetch-user-by-id',
        text,
        values: params,
      });

      if (rows.length === 0) return null;

      const u = rows[0];
      return {
        id: u.id,
        name: this.formatUserName(u.first_name, u.last_name, u.username),
        email: u.email ?? u.username,
      };
    } catch (err) {
      this.logger.error(`Error in getUserById(${userId}):`, err);
      return null;
    }
  }

  async getUsersByIds(userIds: string[]): Promise<Map<string, UserBasicInfo>> {
    const map = new Map<string, UserBasicInfo>();
    if (
      !this.isKeycloakDatabaseAvailable() ||
      !this.realmName ||
      userIds.length === 0
    ) {
      if (!this.isKeycloakDatabaseAvailable()) {
        this.logger.warn('DB not available - skipping getUsersByIds');
      }
      return map;
    }

    const text = `
    SELECT
      u.id,
      u.username,
      u.email,
      u.first_name,
      u.last_name
    FROM user_entity u
    JOIN realm r
      ON u.realm_id = r.id
    WHERE
      u.id       = ANY($1::varchar[])
      AND r.name = $2
      AND u.enabled = true
  `;
    const params = [userIds, this.realmName];

    try {
      const { rows } = await this.pool!.query({
        name: 'fetch-users-by-ids',
        text,
        values: params,
      });
      if (rows.length < userIds.length) {
        this.logger.warn(
          `getUsersByIds: fewer users returned than requested (${rows.length} of ${userIds.length})`,
        );
      }
      for (const u of rows) {
        map.set(u.id, {
          id: u.id,
          name: this.formatUserName(u.first_name, u.last_name, u.username),
          email: u.email ?? u.username,
        });
      }
    } catch (err) {
      this.logger.error('Error in getUsersByIds:', err);
    }

    return map;
  }

  private formatUserName(
    firstName: string | null,
    lastName: string | null,
    username: string,
  ): string {
    const first = firstName?.trim();
    const last = lastName?.trim();
    if (first && last) return `${first} ${last}`;
    if (first) return first;
    if (last) return last;
    return username;
  }
}
