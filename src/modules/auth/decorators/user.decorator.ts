import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContext } from '../interfaces/user-context.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserContext => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
