import { UseGuards } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WsAuthenticatedGuard } from 'src/guards/ws-authenticated.guard';
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
    handleMessage(
        @MessageBody('chatId') chatId: string,
        @ConnectedSocket() client: Socket,
    ) {
        this.supportRequestsService.subscribe(
            (supportRequest: SupportRequest, message: Message) => {
                if (String(supportRequest) === chatId) {
                    client.emit(chatId, message);
                }
            },
        );
    }
}
