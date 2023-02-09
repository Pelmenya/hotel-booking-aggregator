import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ERRORS_USER } from '../users/users.constants';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('@LocalStrategy validate');
        const user = await this.authService.validateUser(email, password);
        console.log(`@LocalStrategy validate ${JSON.stringify(user)}`);
        if (user) {
            return user;
        }
        throw new UnauthorizedException(ERRORS_USER.NOT_FOUND);
    }
}
