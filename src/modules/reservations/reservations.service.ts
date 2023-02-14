import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { differenceInDays } from 'date-fns';
import { Model } from 'mongoose';
import { ID } from 'src/types/id';
import {
    populateHotelParam,
    populateHotelRoomParam,
} from '../hotel-rooms/hotel-rooms.constants';
import {
    ERRORS_RESERVATION,
    MIN_DAYS_RESERVATION,
    selectReservation,
} from './reservation.constants';
import { Reservation } from './schemas/reservation.schema';
import { CreateReservationDto } from './types/create-reservation.dto';
import { IReservationsService } from './types/i-reservations-service';
import { SearchReservationsParams } from './types/search-reservations-params';
import { IValidationFields } from './types/i-validation-fields';
import { TReservationDocument } from './types/t-reservation-document';
import { User } from '../users/schemas/users.schema';

@Injectable()
export class ReservationsService implements IReservationsService {
    constructor(
        @InjectModel(Reservation.name)
        private readonly ReservationModel: Model<TReservationDocument>,
    ) {}

    async findById(id: ID) {
        const res = await this.ReservationModel.findById(id)
            .select(selectReservation)
            .populate(populateHotelParam)
            .populate(populateHotelRoomParam);

        return res;
    }

    async addReservation(dto: CreateReservationDto) {
        const datesIsValid = await this.validateReservationDates(dto);
        if (datesIsValid) {
            const reservation = await this.ReservationModel.create(dto);
            return await this.findById(reservation._id);
        } else {
            throw new NotFoundException(ERRORS_RESERVATION.ROOM_IS_OCCUPIED);
        }
    }

    async validateReservationDates(dto: CreateReservationDto) {
        const { startDate, endDate, room } = dto;
        if (
            differenceInDays(new Date(endDate), new Date(startDate)) <
            MIN_DAYS_RESERVATION
        ) {
            throw new NotFoundException(
                ERRORS_RESERVATION.MIN_DAYS_RESERVATION,
            );
        }

        const searchParams: IValidationFields = { room };
        searchParams.startDate = { $gte: startDate };
        searchParams.endDate = { $lte: startDate };

        const startIsInIntervalDate = await this.ReservationModel.findOne(
            searchParams,
        );
        if (!startIsInIntervalDate) {
            searchParams.startDate = { $gte: endDate };
            searchParams.endDate = { $lte: endDate };
            const endIsInIntervalDate = await this.ReservationModel.findOne(
                searchParams,
            );
            if (!endIsInIntervalDate) {
                searchParams.startDate = { $gte: startDate };
                searchParams.endDate = { $lte: endDate };
                const startDateAndEndDateContainsInterval =
                    await this.ReservationModel.findOne(searchParams);
                if (!startDateAndEndDateContainsInterval) {
                    return true;
                }
            }
        }
        return false;
    }

    async removeReservation(room: ID, user: ID): Promise<Reservation> {
        const reservation = await this.ReservationModel.findById(room);
        if (reservation) {
            if (String(reservation.user) === user) {
                return await this.ReservationModel.findByIdAndRemove(room)
                    .select(selectReservation)
                    .populate(populateHotelParam)
                    .populate(populateHotelRoomParam);
            }
            throw new ForbiddenException(ERRORS_RESERVATION.USER_NOT_VALID);
        }
        throw new BadRequestException(
            ERRORS_RESERVATION.RESERVATION_IS_NOT_EXIST,
        );
    }

    async getReservations(
        query: SearchReservationsParams,
    ): Promise<Reservation[]> {
        const { limit = 20, offset = 0, user, startDate, endDate } = query;
        const searchParams: SearchReservationsParams = { user };

        if (startDate) {
            searchParams.startDate = startDate;
        }

        if (endDate) {
            searchParams.endDate = endDate;
        }

        const res = await this.ReservationModel.find(searchParams)
            .limit(limit)
            .skip(offset)
            .select(selectReservation)
            .populate(populateHotelParam)
            .populate(populateHotelRoomParam);

        return res;
    }
}
