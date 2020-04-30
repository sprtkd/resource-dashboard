import { Component, OnInit } from '@angular/core';
import { FileUiImportModel, FileStatus } from 'src/app/models/ui/file.ui.import.model';
import { interval } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.css']
})
export class FileImportComponent implements OnInit {

  fileImportObject: FileUiImportModel;
  viewDetails: Boolean;
  constructor(private custService: CustomerService) { }

  ngOnInit(): void {
    this.resetFileImport()
    this.viewDetails = false;
  }

  resetFileImport() {
    this.fileImportObject = new FileUiImportModel();
    this.fileImportObject.resetFileImport();
  }

  onFileSelected(fileInputEvent: any) {
    this.fileImportObject.fileSelected(fileInputEvent, this.custService);
  }

}
