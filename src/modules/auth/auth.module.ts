import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { KeycloakService } from './services/keycloak.service';
import { KeycloakDatabaseService } from './services/keycloak-database.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [AuthService, AuthGuard, KeycloakService, KeycloakDatabaseService],
  exports: [AuthService, AuthGuard, KeycloakService, KeycloakDatabaseService],
})
export class AuthModule {}
