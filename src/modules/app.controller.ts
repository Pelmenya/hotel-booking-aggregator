import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { path } from 'app-root-path';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Res() res: Response) {
        return !!process.env.IS_DEV
            ? res.sendFile(`${path}/public/index.html`)
            : res.send(this.appService.getHello());
    }
}
