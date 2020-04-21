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
  viewDetails: Boolean;
  constructor() { }

  ngOnInit(): void {
    this.resetFileImport()
    this.viewDetails = false;
  }

  resetFileImport() {
    this.fileImportObject = new FileUiImportModel();
    this.fileImportObject.resetFileImport();
  }

  onFileSelected(fileInputEvent: any) {
    this.fileImportObject.fileToUpload = fileInputEvent.target.files[0];
    this.fileImportObject.fileSelected();
  }

}
