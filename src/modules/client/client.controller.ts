import { Post, Body, Controller, UseGuards, Req } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/types/register.dto';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import { ReservationsService } from '../reservations/reservations.service';
import { CreateReservationDto } from '../reservations/types/create-reservation.dto';
import { IUser } from '../users/types/i-user';

@UseGuards(RolesGuard)
@Controller('client')
export class ClientController {
    constructor(
        private readonly authService: AuthService,
        private readonly reservationsService: ReservationsService,
        private readonly hotelRoomsService: HotelRoomsService,
    ) {}

    @UseGuards(NotAuthenticatedGuard)
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('reservations')
    @Roles('client')
    async addReservation(
        @Req() req: Express.Request & { user: IUser },
        @Body() dto: CreateReservationDto,
    ) {
        const { hotel } = await this.hotelRoomsService.findOne(dto.room);
        return await this.reservationsService.addReservation({
            ...dto,
            user: String(req?.user._id),
            hotel: String(hotel),
        });
    }
}
