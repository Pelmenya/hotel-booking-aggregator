import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IUser } from 'src/modules/users/types/i-user';
import { ERRORS_USER } from 'src/modules/users/users.constants';

@Injectable()
export class WsAuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const client = context.switchToWs().getClient();
        const { request } = client;
        let isValidUser = false;
        if (request.user) {
            const { user } = request as Request & { user: IUser };
            if (user.role === 'client' || user.role === 'manager') {
                isValidUser = true;
            }
        }

        if (isValidUser) {
            return isValidUser && request.isAuthenticated();
        }

        throw new UnauthorizedException(ERRORS_USER.UNAUTHORIZED);
    }
}
