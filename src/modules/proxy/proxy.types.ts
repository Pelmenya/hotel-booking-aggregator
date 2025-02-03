export type TSuggestion = {
    machine: string;
    sign: string;
    value: string;
    zip: string;
};

export type TSuggestionAddressResData = {
    query: string;
    requestProcessTime: number;
    suggestions: TSuggestion[];
};

export type TPoint = {
    latitude: number;
    longitude: number;
};
export type TCoordinatesResData = {
    coordinates: TPoint;
};
