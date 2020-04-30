import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUiExportModel } from 'src/app/models/ui/file.ui.export.model';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { CommonsService } from 'src/app/services/commons.service';
import { NavbarComponent } from 'src/app/common/navbar/navbar.component';
import { CustomerBackendModel } from 'src/app/models/backend/customer.backend.model';
import { CustomerUiBasicModel, CustomerStatus } from 'src/app/models/ui/customer.ui.details.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-file-export',
  templateUrl: './file-export.component.html',
  styleUrls: ['./file-export.component.css'],
  providers: [CustomerService]
})
export class FileExportComponent implements OnInit {
  fileUiExportModel: FileUiExportModel;
  constructor(private customerService: CustomerService, private commonsService: CommonsService, private navbar: NavbarComponent) { }

  ngOnInit(): void {
    this.fileExportModelReset()
  }
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>>;

  fileExportModelReset() {
    this.fileUiExportModel = new FileUiExportModel();
    this.fileUiExportModel.typeAllowed = [
      { value: '.xlsx', viewValue: 'Excel Sheet' },
      { value: '.pdf', viewValue: 'PDF' },
      { value: '.csv', viewValue: 'CSV File' }
    ];
    this.fileUiExportModel.exportedDatasource = new MatTableDataSource();
    this.fileUiExportModel.exportedFile = null;
    this.fileUiExportModel.fromDateValid = false;
    this.fileUiExportModel.toDateValid = false;
    this.fileUiExportModel.customerFilter = null;
    this.fileUiExportModel.typeSelected = null;
    this.fileUiExportModel.fromDateValue = null;
    this.fileUiExportModel.toDateValue = null;
    this.fileUiExportModel.errMessage = null;
    this.fileUiExportModel.listOfCustomers = null;
  }

  resetCustomerList() {
    if (this.fileUiExportModel.customerFilter == 'all') {
      this.fileUiExportModel.fromDateValid = false;
      this.fileUiExportModel.toDateValid = false;
    }
    this.fileUiExportModel.listOfCustomers = null;
  }
  checkInputsValid(): Boolean {
    if (this.fileUiExportModel.typeSelected == null) {
      this.fileUiExportModel.errMessage = "Please select File Type";
      this.fileUiExportModel.listOfCustomers = null;
      return false;
    }
    if (this.fileUiExportModel.customerFilter == null) {
      this.fileUiExportModel.errMessage = "Please select Customer Filter";
      this.fileUiExportModel.listOfCustomers = null;
      return false;
    }
    if (this.fileUiExportModel.fromDateValid && !this.fileUiExportModel.fromDateValue) {
      this.fileUiExportModel.errMessage = "Please select valid From Date";
      this.fileUiExportModel.listOfCustomers = null;
      return false;
    }
    if (this.fileUiExportModel.toDateValid && !this.fileUiExportModel.toDateValue) {
      this.fileUiExportModel.errMessage = "Please select valid To Date";
      this.fileUiExportModel.listOfCustomers = null;
      return false;
    }
    if (this.fileUiExportModel.fromDateValid && this.fileUiExportModel.fromDateValue
      && this.fileUiExportModel.toDateValid && this.fileUiExportModel.toDateValue) {
      if (this.fileUiExportModel.toDateValue < this.fileUiExportModel.fromDateValue) {
        this.fileUiExportModel.errMessage = "Please select To Date Lesser than From Date";
        this.fileUiExportModel.listOfCustomers = null;
        return false;
      }
    }
    this.fileUiExportModel.errMessage = null;
    if (this.fileUiExportModel.listOfCustomers == null) {
      this.getAllCustomers();
    }

    return true;

  }
  getErrMsg() {
    if (!this.checkInputsValid()) {
      return this.fileUiExportModel.errMessage;
    }
    return null;
  }

  exportExcel() {
    if (this.fileUiExportModel.listOfCustomers == null) {
      this.getAllCustomers();
    }
    const workSheet = XLSX.utils.json_to_sheet(this.fileUiExportModel.exportedDatasource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'filename.xlsx');
  }

  getAllCustomers() {
    this.navbar.spinnerStart();
    this.fileUiExportModel.listOfCustomers = [];
    this.fileUiExportModel.exportedDatasource = null;

    this.customerService.fetchAllCustomers()
      .subscribe((data: CustomerBackendModel[]) => {
        for (let currCustomer of data) {
          let customerData: CustomerUiBasicModel = CustomerUiBasicModel.transformBackendCustomerToUI(currCustomer);
          if (this.isCustomerValidForFilter(customerData)) {
            this.fileUiExportModel.listOfCustomers.push(customerData);
          }
        }
        this.fileUiExportModel.exportedDatasource = new MatTableDataSource(this.fileUiExportModel.listOfCustomers);
      },
        error => {
          this.commonsService.openSnackBar(error, "Failed to fetch Customers", null);
        }).add(() => {
          this.navbar.spinnerStop();
        });
  }

  isCustomerValidForFilter(custData: CustomerUiBasicModel) {

    if (this.fileUiExportModel.customerFilter == 'allClosed'
      && CustomerStatus.MARKED_AS_CLOSED != custData.status &&
      CustomerStatus.MARKED_AS_ACTIVE != custData.status) {
      return false;
    }

    if ((this.fileUiExportModel.customerFilter == 'MARKED_AS_CLOSED' && CustomerStatus.MARKED_AS_CLOSED != custData.status) ||
      (this.fileUiExportModel.customerFilter == 'MARKED_AS_ACTIVE' && CustomerStatus.MARKED_AS_ACTIVE != custData.status)) {
      return false;
    }
    if (CustomerStatus.MARKED_AS_CLOSED == custData.status || CustomerStatus.MARKED_AS_ACTIVE == custData.status) {

      if (this.fileUiExportModel.fromDateValid &&
        (this.fileUiExportModel.fromDateValue.toISOString() > custData.moreDetails.ticketClosureDate.toString())) {
        return false;
      }

      if (this.fileUiExportModel.toDateValid &&
        (custData.moreDetails.ticketClosureDate.toString() > this.fileUiExportModel.toDateValue.toISOString())) {
        return false;
      }
    }
    return true;
  }


}

