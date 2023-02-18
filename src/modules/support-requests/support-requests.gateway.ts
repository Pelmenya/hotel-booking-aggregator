import { UseGuards } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ID } from 'src/types/id';
import { Message } from './schemas/message';
import { SupportRequest } from './schemas/support-request';
import { SupportRequestsService } from './support-requests.service';

@WebSocketGateway()
export class SupportRequestsGateway {
    constructor(
        private readonly supportRequestsService: SupportRequestsService,
    ) {}

    @WebSocketServer() server: Server;

    @SubscribeMessage('subscribeToChat')
    handleMessage(
        @MessageBody('chatId') chatId,
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
