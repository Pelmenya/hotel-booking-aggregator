export const selectHotelParam = {
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
    description: 1,
    images: 1,
    isEnabled: 1,
};
