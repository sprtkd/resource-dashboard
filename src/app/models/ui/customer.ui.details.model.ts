export enum CustomerStatus {
    INACTIVE = <any>'I',
    ACTIVE = <any>'A',
    CLOSED = <any>'C',
}

export interface CustomerUiBasicModel {
    accountNumber: number;
    name: string;
    contactNumber: String;
    status: CustomerStatus;
    lastTransactionDate: Date;
}