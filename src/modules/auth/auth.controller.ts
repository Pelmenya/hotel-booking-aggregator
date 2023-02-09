import { Body, Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginGuard } from './login.guard';
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

    @Post('logout')
    logout() {
        return this.authService.logout();
    }
}
