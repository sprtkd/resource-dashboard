import { CustomerUiBasicModel } from './customer.ui.details.model';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerUiExportModel } from './customer.ui.export.model';

export interface SelectModel {
    value: string;
    viewValue: string;
}

export class FileUiExportModel {
    fromDateValue: Date;
    fromDateValid: Boolean;
    toDateValue: Date;
    toDateValid: Boolean;
    typeAllowed: SelectModel[];
    typeSelected: String;
    exportedFile: any;
    exportedDatasource: MatTableDataSource<CustomerUiExportModel>;
    customerFilter: String;
    errMessage: String;
    listOfCustomers: CustomerUiExportModel[];
    headers: String[];

    resetModel() {
        this.typeAllowed = [
            { value: '.xlsx', viewValue: 'Excel Sheet' },
            { value: '.pdf', viewValue: 'PDF' },
            { value: '.csv', viewValue: 'CSV File' }
        ];
        this.exportedDatasource = new MatTableDataSource();
        this.exportedFile = null;
        this.fromDateValid = false;
        this.toDateValid = false;
        this.customerFilter = null;
        this.typeSelected = null;
        this.fromDateValue = null;
        this.toDateValue = null;
        this.errMessage = null;
        this.listOfCustomers = null;
        this.headers = [
            "accountNumber",
            "name",
            "status",
            "lastTransactionDate",
            "ticketClosureDate",
            "ticketNumber"];
    }
}