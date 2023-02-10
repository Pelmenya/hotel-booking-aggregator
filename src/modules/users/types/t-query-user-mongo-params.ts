export type TQueryUserMongoParams = {
    name?: { $regex: string };
    email?: { $regex: string };
    contactPhone?: { $regex: string };
};
