import { UseGuards } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Socket, Server } from 'socket.io';
import { WsAuthenticatedGuard } from 'src/guards/ws-authenticated.guard';
import { IUser } from '../users/types/i-user';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { SupportRequestsService } from './support-requests.service';

@WebSocketGateway()
export class SupportRequestsGateway {
    constructor(
        private readonly supportRequestsService: SupportRequestsService,
    ) {}

    @WebSocketServer() server: Server;

    @UseGuards(WsAuthenticatedGuard)
    @SubscribeMessage('subscribeToChat')
    async handleMessage(
        @MessageBody('chatId') chatId: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const { user } = socket.request as Request & { user: IUser };

        await this.supportRequestsService.hasSupportRequest(user, chatId);
        this.supportRequestsService.subscribe(
            (supportRequest: SupportRequest, message: Message) => {
                if (String(supportRequest) === chatId) {
                    socket.emit(chatId, message);
                }
            },
        );
    }
}
