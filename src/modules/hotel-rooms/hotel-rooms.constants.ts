export const populateHotelParam = {
    path: 'hotel',
    select: {
        _id: 0,
        id: '$_id',
        title: 1,
        description: 1,
    },
};

export const selectHotelRoomParam = {
    _id: 0,
    id: '$_id',
    title: 1,
    description: 1,
    images: 1,
    isEnabled: 1,
};

export const populateHotelRoomParam = {
    path: 'room',
    select: {
        _id: 0,
        id: '$_id',
        title: 1,
        description: 1,
        images: 1,
    },
};

export const ERRORS_HOTEL_ROOMS = {
    NOT_EXIST: 'Номера с таким Id не существует',
};
