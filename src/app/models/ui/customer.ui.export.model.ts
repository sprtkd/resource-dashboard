import { CustomerUiBasicModel, CustomerStatus } from './customer.ui.details.model';

export class CustomerUiExportModel {
    accountNumber: String;
    name: String;
    status: String;
    lastTransactionDate: String;
    ticketClosureDate: String;
    ticketNumber: String;

    static getExportFromBasicModel(customerUiBasicModel: CustomerUiBasicModel): CustomerUiExportModel {
        let customerUiExportModel: CustomerUiExportModel = new CustomerUiExportModel();
        customerUiExportModel.accountNumber = customerUiBasicModel.accountNumber;
        customerUiExportModel.name = customerUiBasicModel.name;
        customerUiExportModel.status = CustomerStatus[customerUiBasicModel.status];
        customerUiExportModel.lastTransactionDate = CustomerUiExportModel.getFormattedDateString(customerUiBasicModel.lastTransactionDate);
        if (customerUiBasicModel.moreDetails.ticketClosureDate != null) {
            customerUiExportModel.ticketClosureDate = CustomerUiExportModel.getFormattedDateString(customerUiBasicModel.moreDetails.ticketClosureDate);;
        }
        else {
            customerUiExportModel.ticketClosureDate = null;
        }
        customerUiExportModel.ticketNumber = customerUiBasicModel.moreDetails.ticketNumber;
        return customerUiExportModel;
    }

    private static getFormattedDateString(date: Date): String {
        return new Date(date).toISOString().slice(0, 10)
    }

}