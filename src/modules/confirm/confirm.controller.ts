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
import { CreateConfirmEmailCodeDto } from './types/create-confirm-email-code.dto';
import { CreateConfirmSmsCodeDto } from './types/create-confirm-sms-code';

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
        @Body() dto: CreateConfirmEmailCodeDto,
    ) {
        return this.confirmService.confirmEmail(req.user._id, dto);
    }

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Post('sms-code')
    async createSmsCode(@Req() req: Request & { user: IUser }) {
        return this.confirmService.createOrUpdateSmsCode(req);
    }

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Put('phone')
    async confirmSms(
        @Req() req: Request & { user: IUser },
        @Body() dto: CreateConfirmSmsCodeDto,
    ) {
        return this.confirmService.confirmSms(req.user._id, dto);
    }
}
