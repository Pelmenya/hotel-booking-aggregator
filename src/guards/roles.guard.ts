import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { ERRORS_USER } from 'src/modules/users/users.constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        if (!request.isAuthenticated()) {
            throw new UnauthorizedException(ERRORS_USER.UNAUTHORIZED);
        }

        const { user } = request;
        const hasRole = !!roles.find((item) => item === user.role);

        return hasRole;
    }
}
