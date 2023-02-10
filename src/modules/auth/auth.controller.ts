import {
    Body,
    Controller,
    Post,
    UseGuards,
    HttpCode,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { LoginGuard } from '../../guards/login.guard';
import { LoginDto } from './types/login.dto';

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
}
