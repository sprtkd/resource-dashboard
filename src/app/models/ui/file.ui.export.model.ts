import { CustomerUiBasicModel } from './customer.ui.details.model';
import { MatTableDataSource } from '@angular/material/table';

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
    exportedDatasource: MatTableDataSource<CustomerUiBasicModel>;
    customerFilter: String;
    errMessage: String;
    listOfCustomers: CustomerUiBasicModel[];
}