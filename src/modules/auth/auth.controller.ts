import {
    Body,
    Controller,
    Post,
    UseGuards,
    HttpCode,
    Req,
    Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { LoginGuard } from '../../guards/login.guard';
import { LoginDto } from './types/login.dto';
import { UpdatePasswordDto } from './types/update-password.dto';
import { IUser } from '../users/types/i-user';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    @UseGuards(LoginGuard)
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.login(dto);
        const { email, name, contactPhone } = user;
        return { email, name, contactPhone };
    }

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Post('logout')
    logout(@Req() req: Request) {
        return this.authService.logout(req);
    }

    @UseGuards(AuthenticatedGuard)
    @Put('password')
    async updatePassword(
        @Req() req: Request & { user: IUser },
        @Body() dto: UpdatePasswordDto,
    ) {
        return this.authService.updatePassword(req, dto);
    }
}
