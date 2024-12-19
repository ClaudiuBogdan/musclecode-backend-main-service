import { Injectable } from '@nestjs/common';
import { UserContext } from '../interfaces/user-context.interface';

@Injectable()
export class AuthService {
  private readonly defaultUser: UserContext = {
    id: 'dev-user-1',
    email: 'dev@example.com',
    roles: ['user', 'admin'],
  };

  getCurrentUser(): UserContext {
    return this.defaultUser;
  }
}
