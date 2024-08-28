export type TResponseSendSms = {
    data: {
        result:
            | 'UNKNOWN'
            | 'ERROR'
            | 'UPDATED'
            | 'RENAMED'
            | 'DELETED'
            | 'CREATED'
            | 'UNCHANGED'
            | 'PENDING';
        id: string;
        count: number;
    };
};
