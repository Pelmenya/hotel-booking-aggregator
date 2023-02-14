export const MIN_DAYS_RESERVATION = 1;

export const ERRORS_RESERVATION = {
    ROOM_IS_OCCUPIED: 'Номер занят в этот период',
    MIN_DAYS_RESERVATION: `Бронирование от ${MIN_DAYS_RESERVATION} дня`,
    RESERVATION_IS_NOT_EXIST: 'Брони с таким id не существует',
    USER_NOT_VALID:
        'Id текущего пользователя не совпадает с id пользователя брони',
};

export const selectReservation = {
    _id: 0,
    id: '$_id',
    room: 1,
    hotel: 1,
    startDate: 1,
    endDate: 1,
};
