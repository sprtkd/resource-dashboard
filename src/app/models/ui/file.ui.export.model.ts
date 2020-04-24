import { CustomerUiBasicModel } from './customer.ui.details.model';

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
    exportedFile;
    customerFilter: String;
    errMessage: String;
    listOfCustomers: CustomerUiBasicModel[];
}