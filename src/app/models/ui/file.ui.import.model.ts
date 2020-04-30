import { interval } from 'rxjs';
import * as XLSX from 'xlsx';
import { CustomerBackendModel } from '../backend/customer.backend.model';
import { CustomerService } from 'src/app/services/customer.service';

export enum FileStatus {
    NONE,
    SELECTED,
    VALIDATING,
    VALIDATION_FAILED,
    EXTRACTING,
    EXTRACT_FAILED,
    UPLOADING,
    UPLOAD_FAILED,
    FAILED_SAVE_DB,
    SAVED_TO_DB,
    CANCELLED
}
type AOA = any[][];

export class FileUiImportModel {
    fileName: String;
    status: FileStatus;
    uploadPercentage: number;
    progressBarType: String;
    fileToUpload: File;
    message: String;
    fileSize: number;
    successMessageList: String[];
    fileData: AOA;
    uploadCustomerList: CustomerBackendModel[];
    custService: CustomerService;
    //do not edit order
    private headerItemList: string[] =
        ["accountNum", "customerName", "emailId", "contact", "accountStatus", "lastTranDate", "address"];
    getFileStatus(): String {
        return FileStatus[this.status];
    }

    getIfFailed(): Boolean {
        if (this.status == FileStatus.VALIDATION_FAILED || this.status == FileStatus.UPLOAD_FAILED || this.status == FileStatus.EXTRACT_FAILED || this.status == FileStatus.FAILED_SAVE_DB) {
            return true;
        }
        return false;
    }

    formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }


    resetFileImport() {
        this.fileName = null;
        this.fileToUpload = null;
        this.progressBarType = "determinate";
        this.status = FileStatus.NONE;
        this.uploadPercentage = 0;
        this.fileSize = 0;
        this.message = null;
        this.successMessageList = [];
        this.fileData = null;
        this.uploadCustomerList = null;
        this.custService = null;
    }

    validateAndUploadExcel() {
        this.validateExcel();
    }

    fileSelected(fileInputEvent: any, customerService: CustomerService) {
        this.custService = customerService;
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(fileInputEvent.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            /* save data */
            this.fileData = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        };
        this.fileToUpload = target.files[0];
        reader.readAsBinaryString(this.fileToUpload);
        this.fileName = this.fileToUpload.name;
        this.fileSize = this.fileToUpload.size;
        this.status = FileStatus.SELECTED;
        this.successMessageList.push("File Selected.");
    }

    private validateExcel() {
        this.progressBarType = "indeterminate";
        this.status = FileStatus.VALIDATING;
        this.uploadPercentage = 0;
        this.message = "Validating Excel Sheet";
        let xlsx_mime_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        let xls_mime_type = "application/vnd.ms-excel";
        let csv_mime_type = "text/csv";
        if (this.fileToUpload.type != xlsx_mime_type && this.fileToUpload.type != xls_mime_type && this.fileToUpload.type != csv_mime_type) {
            this.status = FileStatus.VALIDATION_FAILED;
            this.message = "Validation Failed. Not an Excel Sheet.";
            return;
        }
        if (this.fileToUpload.size >= 5000000) {
            this.status = FileStatus.VALIDATION_FAILED;
            this.message = "Validation Failed. Bigger than 5 MB";
            return;
        }
        this.successMessageList.push("File Validated.");
        this.dataToModelListExtract();
    }

    private dataToModelListExtract() {
        this.progressBarType = "indeterminate";
        this.status = FileStatus.EXTRACTING
        this.uploadPercentage = 0;
        this.message = "Extracting Data from file";
        if (this.fileData.length < 2) {
            this.status = FileStatus.EXTRACT_FAILED;
            this.message = "Excel dimensions wrong";
            return;
        }
        let headers: string[] = this.fileData[0];
        for (let item of this.headerItemList) {
            if (!headers.includes(item)) {
                this.status = FileStatus.EXTRACT_FAILED;
                this.message = "Excel headers wrong. Missing: " + item;
                return;
            }
        }
        this.uploadCustomerList = [];
        for (let indexOfArrayList: number = 1; indexOfArrayList < this.fileData.length; indexOfArrayList++) {
            this.uploadCustomerList.push(this.transformDataItemToCustModel(this.fileData[indexOfArrayList], headers));
        }

        this.successMessageList.push("File Extracted.");
        this.uploadExcel();
    }

    private transformDataItemToCustModel(dataItem, header: string[]): CustomerBackendModel {
        let customerBackendModel: CustomerBackendModel = new CustomerBackendModel();
        customerBackendModel.accountNum = dataItem[header.indexOf(this.headerItemList[0])];
        customerBackendModel.customerName = dataItem[header.indexOf(this.headerItemList[1])];
        customerBackendModel.emailId = dataItem[header.indexOf(this.headerItemList[2])];
        customerBackendModel.contact = dataItem[header.indexOf(this.headerItemList[3])];
        customerBackendModel.accountStatus = dataItem[header.indexOf(this.headerItemList[4])];
        customerBackendModel.lastTranDate = this.getDate(dataItem[header.indexOf(this.headerItemList[5])]);
        customerBackendModel.address = dataItem[header.indexOf(this.headerItemList[6])];
        customerBackendModel.ticketRaised = null;
        customerBackendModel.ticketid = null;
        return customerBackendModel;
    }

    private getDate(inputDate: string): Date {
        let dateArr: string[] = inputDate.split('/');
        let date = new Date(+dateArr[2], +dateArr[0], +dateArr[1]);
        return date;
    }


    private uploadExcel() {
        this.progressBarType = "indeterminate";
        this.status = FileStatus.UPLOADING;
        this.uploadPercentage = 0;
        this.message = "Uploading File to Server";
        //actual upload
        this.custService.addCustomerList(this.uploadCustomerList)
            .subscribe((data) => {
                this.successMessageList.push("File Uploaded.");
                this.status = FileStatus.SAVED_TO_DB
                this.successMessageList.push("Success. Data added from Excel to DB.");
                this.message = "Success. Data added from Excel";
            },
                error => {
                    this.status = FileStatus.UPLOAD_FAILED;
                    this.message = "Upload failed. Error: " + error;
                    return;
                });
    }
}