import { CustomerBackendModel } from '../backend/customer.backend.model';
import { TicketBackendModel } from 'src/app/models/backend/ticket.backend.model';

export enum CustomerStatus {
    INACTIVE = <any>'I',
    INITIATED = <any>"INI",
    CUST_RESP = <any>"CR",
    PENDING_APPROVAL = <any>"PA",
    READY_FOR_ACTIVATION = <any>'A',
    READY_TO_CLOSED = <any>'C',
    CUSTOMER_CONNECT = <any>"CC"
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
        currCustomerUiBasicModel.moreDetails.ticketNumber = customerBackendModel.ticketRaised;
        if (currCustomerUiBasicModel.moreDetails.ticketNumber != null) {
            currCustomerUiBasicModel.moreDetails.ticketRaised = customerBackendModel.ticketid;
            currCustomerUiBasicModel.status = CustomerStatus[customerBackendModel.ticketid.ticketStatus];
        }
        return currCustomerUiBasicModel;
    }
}

export class CustomerExtraDetails {
    emailId: String;
    ticketNumber: String;
    ticketRaised: TicketBackendModel;
    address: String;
}

