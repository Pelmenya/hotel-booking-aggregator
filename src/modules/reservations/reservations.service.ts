import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { Reservation } from './schemas/reservation.schema';
import { CreateReservationDto } from './types/create-reservation.dto';
import { IReservationsService } from './types/i-reservations-service';
import { ISearchReservationsParams } from './types/i-search-reservations-params';
import { TReservationDocument } from './types/t-reservation-document';

@Injectable()
export class ReservationsService implements IReservationsService {
    constructor(
        @InjectModel(Reservation.name)
        private readonly ReservationModel: Model<TReservationDocument>,
    ) {}

    async addReservation(dto: CreateReservationDto) {
        return await this.ReservationModel.create(dto);
    }

    async removeReservation(id: ID): Promise<Reservation> {
        const dto: any = {};
        return await this.ReservationModel.create(dto);
    }

    async getReservations(
        query: ISearchReservationsParams,
    ): Promise<Reservation[]> {
        console.log(query);
        const dto: any = {};
        return [await this.ReservationModel.create(dto)];
    }
}
