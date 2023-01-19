import { Post, Body, Controller } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { IRegisterDto } from '../auth/types/i-register-dto';

@Controller('client')
export class ClientController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public register(@Body() dto: IRegisterDto) {
        return this.authService.register(dto);
    }
}
