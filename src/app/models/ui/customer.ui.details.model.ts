export enum CustomerStatus {
    INACTIVE = 'I',
    ACTIVE = 'A',
    CLOSED = 'C'
}

export interface CustomerUiBasicModel {
    accountNumber: number;
    name: string;
    contactNumber: String;
    status: CustomerStatus;
    lastTransactionDate: Date;
}