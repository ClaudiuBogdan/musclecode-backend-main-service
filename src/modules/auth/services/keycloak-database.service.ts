import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';
import { StructuredLogger } from '../../../logger/structured-logger.service'; // Assuming this path is correct
import { UserBasicInfo } from '../interfaces/user.interface'; // Assuming this path is correct

// TODO: Fix this. This is a temporary solution to get the user's name from the Keycloak database, but is compromising security.
// We should use the Keycloak API to get the user's name instead or create a keycloak extension to get the user's name.
@Injectable()
export class KeycloakDatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new StructuredLogger(KeycloakDatabaseService.name);
  private pool: Pool | null = null;
  private isAvailable = false;
  private realmId: string | undefined;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const databaseUrl = this.configService.get<string>('KEYCLOAK_DATABASE_URL');

    if (!databaseUrl) {
      this.logger.warn(
        'KEYCLOAK_DATABASE_URL not provided. Keycloak database integration disabled.',
      );
      return;
    }

    this.realmId = this.configService.get<string>('KEYCLOAK_REALM');

    if (!this.realmId) {
      this.logger.warn(
        'KEYCLOAK_REALM not provided. Keycloak database integration disabled.',
      );
      return;
    }

    try {
      this.pool = new Pool({
        connectionString: databaseUrl,
        ssl: databaseUrl.includes('sslmode=require')
          ? { rejectUnauthorized: false } // WARNING: Using rejectUnauthorized: false is insecure for production. Use with trusted self-signed certs or for local dev only.
          : false,
        max: 10, // Max number of clients in the pool
        idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
        connectionTimeoutMillis: 2000, // How long to wait for a connection to be established
      });

      const client = await this.pool.connect();
      await client.query('SELECT 1'); // Test the connection
      client.release();

      this.isAvailable = true;
      this.logger.log('Keycloak database connection established successfully');
    } catch (error) {
      this.logger.error('Failed to connect to Keycloak database:', error);
      this.isAvailable = false;
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      try {
        await this.pool.end();
        this.logger.log('Keycloak database connection closed');
      } catch (error) {
        this.logger.error('Error closing Keycloak database connection:', error);
      }
    }
  }

  /**
   * Check if the Keycloak database service is available
   */
  isKeycloakDatabaseAvailable(): boolean {
    return this.isAvailable && this.pool !== null;
  }

  /**
   * Fetch user by ID from Keycloak database, filtering by realm.
   */
  async getUserById(userId: string): Promise<UserBasicInfo | null> {
    if (!this.isKeycloakDatabaseAvailable() || !this.realmId) {
      this.logger.warn(
        'Keycloak database is not available. Skipping getUserById.',
      );
      return null;
    }

    let client: PoolClient | null = null;
    try {
      client = await this.pool!.connect();

      // Keycloak typically uses 'realm_id' (lowercase) in the user_entity table.
      // If your schema uses 'REALM_ID' (uppercase), adjust the query (e.g., "REALM_ID").
      const query = `
        SELECT 
          id,
          username,
          email,
          first_name,
          last_name,
          enabled
        FROM user_entity 
        WHERE id = $1 AND realm_id = $2 AND enabled = true
      `;

      const result = await client.query(query, [userId, this.realmId]);

      if (result.rows.length === 0) {
        this.logger.debug(
          `User ${userId} not found in realm ${this.realmId} or not enabled.`,
        );
        return null;
      }

      const user = result.rows[0];
      return {
        id: user.id,
        name: this.formatUserName(
          user.first_name,
          user.last_name,
          user.username,
        ),
        email: user.email || user.username, // Fallback to username if email is null
      };
    } catch (error) {
      this.logger.error(
        `Error fetching user ${userId} from realm ${this.realmId} in Keycloak database:`,
        error,
      );
      return null;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  /**
   * Fetch multiple users by IDs from Keycloak database, filtering by realm.
   */
  async getUsersByIds(userIds: string[]): Promise<Map<string, UserBasicInfo>> {
    const userMap = new Map<string, UserBasicInfo>();

    if (!this.isKeycloakDatabaseAvailable() || !this.realmId) {
      this.logger.warn(
        'Keycloak database is not available. Skipping getUsersByIds.',
      );
      return userMap;
    }

    if (userIds.length === 0) {
      return userMap;
    }

    let client: PoolClient | null = null;
    try {
      client = await this.pool!.connect();

      // Keycloak typically uses 'realm_id' (lowercase) in the user_entity table.
      // If your schema uses 'REALM_ID' (uppercase), adjust the query (e.g., "REALM_ID").
      const query = `
        SELECT 
          id,
          username,
          email,
          first_name,
          last_name,
          enabled
        FROM user_entity 
        WHERE id = ANY($1::varchar[]) AND realm_id = $2 AND enabled = true
      `; // ::varchar[] for explicit type casting of the user ID array

      const result = await client.query(query, [userIds, this.realmId]);

      for (const user of result.rows) {
        userMap.set(user.id, {
          id: user.id,
          name: this.formatUserName(
            user.first_name,
            user.last_name,
            user.username,
          ),
          email: user.email || user.username, // Fallback to username if email is null
        });
      }
    } catch (error) {
      this.logger.error(
        `Error fetching users for realm ${this.realmId} from Keycloak database:`,
        error,
      );
      // Depending on requirements, you might want to throw the error or return a partial map
    } finally {
      if (client) {
        client.release();
      }
    }

    return userMap;
  }

  /**
   * Format user name from first name, last name, and username
   */
  private formatUserName(
    firstName: string | null,
    lastName: string | null,
    username: string,
  ): string {
    const first = firstName?.trim();
    const last = lastName?.trim();

    if (first && last) {
      return `${first} ${last}`;
    } else if (first) {
      return first;
    } else if (last) {
      return last;
    } else {
      return username;
    }
  }
}
