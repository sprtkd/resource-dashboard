import { CustomerBackendModel } from '../backend/customer.backend.model';
import { TicketBackendModel } from 'src/app/models/backend/ticket.backend.model';

export enum CustomerStatus {
    INACTIVE = <any>'I',
    READY_FOR_ACTIVATION = <any>'A',
    READY_TO_CLOSED = <any>'C',
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
        if (customerBackendModel.ticketRaised == null) {
            currCustomerUiBasicModel.moreDetails.ticketRaised = null;
        } else {
            currCustomerUiBasicModel.moreDetails.ticketRaised = new TicketBackendModel();
            currCustomerUiBasicModel.moreDetails.ticketRaised.ticketStatus = "Initiated";
        }

        return currCustomerUiBasicModel;
    }
}

export class CustomerExtraDetails {
    emailId: String;
    ticketRaised: TicketBackendModel;
    address: String;
}

