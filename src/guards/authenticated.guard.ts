import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { ERRORS_USER } from 'src/modules/users/users.constants';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const isValid =
            request.isAuthenticated() && request.user.name && request.user.role;
        if (isValid) {
            return isValid;
        }

        throw new UnauthorizedException(ERRORS_USER.UNAUTHORIZED);
    }
}
