import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Message } from 'src/modules/support-requests/schemas/message';
import { ISupportRequestRes } from 'src/modules/support-requests/types/i-support-request-res';
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
        const { role, _id: userId } = req.user;
        return next.handle().pipe(
            map((supportRequests) =>
                supportRequests.map((supportRequest: ISupportRequestRes) => {
                    let res: Partial<ISupportRequestRes> = {};
                    const { id, isActive, createAt, messages, user } =
                        supportRequest;
                    res = { id, isActive, createAt };
                    const filterMessages = messages.filter(
                        (message: Message & { id: ID }) =>
                            String(userId) !== String(message.author),
                    );
                    res.hasNewMessages = filterMessages.some(
                        (message: Message) => !!message?.readAt === false,
                    );
                    if (role === 'manager') {
                        res.client = user;
                    }
                    return res;
                }),
            ),
        );
    }
}
