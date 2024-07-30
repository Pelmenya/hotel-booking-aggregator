import {
    Body,
    Controller,
    HttpCode,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { IUser } from '../users/types/i-user';
import { ConfirmService } from './confirm.service';

@Controller('confirm')
export class ConfirmController {
    constructor(private readonly confirmService: ConfirmService) {}

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Post('email-code')
    async createEmailCode(@Req() req: Request & { user: IUser }) {
        return this.confirmService.createOrUpdateEmailCode(req);
    }

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Put('email')
    async confirmEmail(
        @Req() req: Request & { user: IUser },
        @Body() dto: any,
    ) {
        return '';
    }
}
