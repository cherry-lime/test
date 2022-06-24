import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isUnauthorized = this.reflector.get<boolean>(
      'isUnauthorized',
      context.getHandler()
    );

    if (isUnauthorized) {
      return true;
    }

    return super.canActivate(context);
  }
}
