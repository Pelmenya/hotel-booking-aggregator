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

export type TCoordinatesResData = {
    coordinates: {
        latitude: number;
        longitude: number;
    };
};
