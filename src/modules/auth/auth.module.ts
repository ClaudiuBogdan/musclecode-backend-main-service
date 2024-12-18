import { Module, Global } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Global()
@Module({
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
