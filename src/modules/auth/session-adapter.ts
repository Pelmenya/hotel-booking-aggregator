import { INestApplicationContext } from '@nestjs/common/interfaces';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction, RequestHandler } from 'express';
import * as passport from 'passport';
import { Server, ServerOptions, Socket } from 'socket.io';

export class SessionAdapter extends IoAdapter {
    private session: RequestHandler;
    constructor(session: RequestHandler, app: INestApplicationContext) {
        super(app);
        this.session = session;
    }

    create(
        port: number,
        options?: ServerOptions & { namespace?: string; server?: any },
    ): Server {
        const server = super.create(port, options);

        const wrap = (middleware) => (socket: Socket, next: NextFunction) =>
            middleware(socket.request, {}, next);

        server.use(wrap(this.session));
        server.use(wrap(passport.initialize()));
        server.use(wrap(passport.session()));
        return server;
    }
}
