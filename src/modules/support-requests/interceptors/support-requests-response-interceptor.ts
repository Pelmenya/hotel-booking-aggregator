import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Message } from 'src/modules/support-requests/schemas/message';
import { ISupportRequestRes } from 'src/modules/support-requests/types/i-support-request-res';
import { User } from 'src/modules/users/schemas/users.schema';
import { ID } from 'src/types/id';

export interface Response<T> {
    data: T;
}
@Injectable()
export class SupportRequestsResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { role } = req.user;
        return next.handle().pipe(
            map((supportRequests) =>
                supportRequests.map((supportRequest: ISupportRequestRes) => {
                    let res: Partial<ISupportRequestRes> = {};
                    const { id, isActive, createAt, messages, user } =
                        supportRequest;
                    res = { id, isActive, createAt };
                    const { _id: creatSupportRequestUserID } = user as User & {
                        _id: ID;
                    };

                    if (role === 'manager') {
                        const filterMessages = messages.filter(
                            (message: Message) =>
                                String(creatSupportRequestUserID) ===
                                String(message.author),
                        );
                        res.hasNewMessages = filterMessages.some(
                            (message: Message) => !!message?.readAt === false,
                        );

                        res.client = {
                            id: creatSupportRequestUserID,
                            email: user.email,
                            name: user.name,
                        };
                    }
                    if (role === 'client') {
                        const filterMessages = messages.filter(
                            (message: Message) =>
                                String(creatSupportRequestUserID) !==
                                String(message.author),
                        );
                        res.hasNewMessages = filterMessages.some(
                            (message: Message) => !!message?.readAt === false,
                        );
                    }
                    return res;
                }),
            ),
        );
    }
}
