import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { path } from 'app-root-path';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly mailService: MailService,
    ) {}

    @Get()
    async getHello(@Res() res: Response) {
        await this.mailService.sendUserConfirmation(
            { name: 'dear friend', email: 'lyapindm@ya.ru' },
            '444',
        );
        return !!process.env.IS_DEV
            ? res.sendFile(`${path}/public/index.html`)
            : res.send(this.appService.getHello());
    }
}
