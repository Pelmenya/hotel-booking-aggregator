export interface IValidationFields {
    startDate?: { $gte: Date };
    endDate?: { $lte: Date };
}
