import { CustomerBackendModel } from '../backend/customer.backend.model';

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
    static transformBackendCustomerToUI(customerBackendModel: CustomerBackendModel): CustomerUiBasicModel {

        var currCustomerUiBasicModel: CustomerUiBasicModel = new CustomerUiBasicModel();
        currCustomerUiBasicModel.accountNumber = customerBackendModel.accountNum;
        currCustomerUiBasicModel.contactNumber = customerBackendModel.contact;
        currCustomerUiBasicModel.lastTransactionDate = customerBackendModel.lastTranDate;
        currCustomerUiBasicModel.name = customerBackendModel.customerName;
        currCustomerUiBasicModel.status = CustomerStatus[customerBackendModel.accountStatus];
        currCustomerUiBasicModel.moreDetails = new CustomerExtraDetails();
        currCustomerUiBasicModel.moreDetails.address = customerBackendModel.address;
        currCustomerUiBasicModel.moreDetails.emailId = customerBackendModel.emailId;
        currCustomerUiBasicModel.moreDetails.ticketRaised = customerBackendModel.ticketRaised;
        return currCustomerUiBasicModel;
    }
}

export class CustomerExtraDetails {
    emailId: String;
    ticketRaised: any;
    address: String;
}

