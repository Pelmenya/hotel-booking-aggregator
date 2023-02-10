import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/types/register.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(NotAuthenticatedGuard)
    @Post('register')
    public register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
}
