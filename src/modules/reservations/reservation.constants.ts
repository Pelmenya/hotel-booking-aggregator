export const ERRORS_RESERVATION = {
    ROOM_IS_OCCUPIED: 'Номер занят в этот период',
    ONE_DAY_BOOKING: 'Бронирование от одного дня',
};

export const MIN_DAYS_RESERVATION = 1;

export const selectReservation = {
    _id: 0,
    id: '$_id',
    room: 1,
    hotel: 1,
    startDate: 1,
    endDate: 1,
};
