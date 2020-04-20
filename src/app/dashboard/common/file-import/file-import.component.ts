import { Component, OnInit } from '@angular/core';
import { FileUiImportModel, FileStatus } from 'src/app/models/ui/file.ui.import.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.css']
})
export class FileImportComponent implements OnInit {

  fileImportObject: FileUiImportModel;
  constructor() { }

  ngOnInit(): void {
    this.resetFileImport()
  }

  resetFileImport() {
    this.fileImportObject = new FileUiImportModel();
    this.fileImportObject.fileName = null;
    this.fileImportObject.fileToUpload = null;
    this.fileImportObject.progressBarType = "determinate";
    this.fileImportObject.status = FileStatus.NONE;
    this.fileImportObject.uploadPercentage = 0;
    this.fileImportObject.fileSize = 0;
    this.fileImportObject.message = null;
  }

  getFileStatus() {
    return FileStatus[this.fileImportObject.status];
  }

  onFileSelected(fileInputEvent: any) {
    this.fileImportObject.fileToUpload = fileInputEvent.target.files[0];
    this.fileImportObject.fileName = this.fileImportObject.fileToUpload.name;
    this.fileImportObject.fileSize = this.fileImportObject.fileToUpload.size;
    this.fileImportObject.status = FileStatus.SELECTED;
  }

  validateUpload() {
    this.fileImportObject.validateAndUploadExcel();
  }

}
