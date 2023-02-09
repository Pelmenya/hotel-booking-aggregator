import { Post, Body, Controller } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/types/register.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
}
