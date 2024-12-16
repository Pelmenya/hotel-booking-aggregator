export type TDescription = {
    idx: number;
    title: string;
    paragraph: string;
};

export type TAbout = {
    aboutHotelDescriptionTitle: string;
    aboutHotelDescriptions: TDescription[];
};
