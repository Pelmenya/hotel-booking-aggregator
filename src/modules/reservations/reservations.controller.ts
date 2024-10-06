import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {}
