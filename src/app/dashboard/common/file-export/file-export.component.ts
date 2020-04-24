import { Component, OnInit } from '@angular/core';
import { FileUiExportModel } from 'src/app/models/ui/file.ui.export.model';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-export',
  templateUrl: './file-export.component.html',
  styleUrls: ['./file-export.component.css']
})
export class FileExportComponent implements OnInit {
  fileUiExportModel: FileUiExportModel;
  constructor() { }

  ngOnInit(): void {
    this.fileExportModelReset()
  }

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

  checkInputsValid(): Boolean {
    if (this.fileUiExportModel.typeSelected == null) {
      this.fileUiExportModel.errMessage = "Please select File Type";
      return false;
    }
    if (this.fileUiExportModel.customerFilter == null) {
      this.fileUiExportModel.errMessage = "Please select Customer Filter";
      return false;
    }
    if (this.fileUiExportModel.fromDateValid && !this.fileUiExportModel.fromDateValue) {
      this.fileUiExportModel.errMessage = "Please select valid From Date";
      return false;
    }
    if (this.fileUiExportModel.toDateValid && !this.fileUiExportModel.toDateValue) {
      this.fileUiExportModel.errMessage = "Please select valid To Date";
      return false;
    }
    if (this.fileUiExportModel.fromDateValid && this.fileUiExportModel.fromDateValue
      && this.fileUiExportModel.toDateValid && this.fileUiExportModel.toDateValue) {
      if (this.fileUiExportModel.toDateValue < this.fileUiExportModel.fromDateValue) {
        this.fileUiExportModel.errMessage = "Please select To Date Lesser than From Date";
        return false;
      }
    }
    this.fileUiExportModel.errMessage = null;
    return true;

  }
  getErrMsg() {
    if (!this.checkInputsValid()) {
      return this.fileUiExportModel.errMessage;
    }
    return null;
  }

  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.fileUiExportModel.exportedDatasource.data, 
      { header: ['dataprop1', 'dataprop2'] });
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'filename.xlsx');
  }

}
