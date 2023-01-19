import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginDto } from './types/i-login-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() dto: ILoginDto) {
        return this.authService.login(dto);
    }

    @Post('logout')
    logout() {
        return this.authService.logout();
    }
}
