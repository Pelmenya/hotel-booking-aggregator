import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const notValid = !request.isAuthenticated();
        return notValid;
    }
}
