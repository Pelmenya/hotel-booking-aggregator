import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { differenceInDays } from 'date-fns';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import { ERRORS_RESERVATION } from './reservation.constants';
import { Reservation } from './schemas/reservation.schema';
import { CreateReservationDto } from './types/create-reservation.dto';
import { IReservationsService } from './types/i-reservations-service';
import { ISearchReservationsParams } from './types/i-search-reservations-params';
import { IValidationFields } from './types/i-validation-fields';
import { TReservationDocument } from './types/t-reservation-document';

@Injectable()
export class ReservationsService implements IReservationsService {
    constructor(
        @InjectModel(Reservation.name)
        private readonly ReservationModel: Model<TReservationDocument>,
    ) {}

    async addReservation(dto: CreateReservationDto) {
        const datesIsValid = await this.validateReservationDates(dto);
        if (datesIsValid) {
            const reservation = await this.ReservationModel.create(dto);
            return reservation;
        } else {
            throw new NotFoundException(ERRORS_RESERVATION.ROOM_IS_OCCUPIED);
        }
    }

    async validateReservationDates(dto: CreateReservationDto) {
        const { startDate, endDate, room } = dto;
        if (differenceInDays(new Date(endDate), new Date(startDate)) < 1) {
            throw new NotFoundException(ERRORS_RESERVATION.ONE_DAY_BOOKING);
        }
        const searchParams: IValidationFields = {};
        searchParams.room = room;
        searchParams.startDate = { $gte: startDate };
        searchParams.endDate = { $lte: startDate };
        const startIsValid = await this.ReservationModel.find(searchParams);
        if (!startIsValid.length) {
            searchParams.startDate = { $gte: endDate };
            searchParams.endDate = { $lte: endDate };
            const endIsValid = await this.ReservationModel.find(searchParams);
            if (!endIsValid.length) {
                searchParams.startDate = { $gte: startDate };
                searchParams.endDate = { $lte: endDate };
                const fullIsValid = await this.ReservationModel.find(
                    searchParams,
                );
                if (!fullIsValid.length) {
                    return true;
                }
            }
        }
        return false;
    }

    async removeReservation(id: ID): Promise<Reservation> {
        return await this.ReservationModel.findByIdAndRemove(id);
    }

    async getReservations(
        query: ISearchReservationsParams,
    ): Promise<Reservation[]> {
        console.log(query);
        const dto: any = {};
        return [await this.ReservationModel.create(dto)];
    }
}
