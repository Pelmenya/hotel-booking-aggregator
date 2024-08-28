export type TValidatePhone = {
    data: {
        phone_country?: string;
        phone_e164?: string;
        phone_is_valid: boolean;
    };
};
