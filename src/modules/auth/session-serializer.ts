import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/id';
import { IUser } from '../users/types/i-user';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UsersService) {
        super();
    }

    serializeUser(userId: any, done: (err: any, id?: ID) => void): void {
        console.log('@SessionSerializer serializeUser');
        done(null, userId);
    }

    async deserializeUser(
        userId: string,
        done: (err: any, user?: IUser) => void,
    ): Promise<void> {
        console.log('@SessionSerializer deserializeUser');
        try {
            const user = await this.userService.findById(userId);
            console.log('Session Passport User: ', user);
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
}
