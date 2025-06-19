import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { RoleEnum } from '../../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRole: RoleEnum) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (user.role === this.allowedRole) {
      return true;
    }

    throw new ForbiddenException('access denied');
  }
}
