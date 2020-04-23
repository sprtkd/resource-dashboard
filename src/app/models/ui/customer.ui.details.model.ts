export enum CustomerStatus {
    INACTIVE = <any>'I',
    ACTIVE = <any>'A',
    CLOSED = <any>'C',
}

export class CustomerUiBasicModel {
    accountNumber: String;
    name: String;
    contactNumber: number;
    status: CustomerStatus;
    lastTransactionDate: Date;
    moreDetails: CustomerExtraDetails;
}

export class CustomerExtraDetails {
    emailId: String;
    ticketRaised: any;
    address: String;
}

