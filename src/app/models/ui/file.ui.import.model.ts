import { interval } from 'rxjs';

export enum FileStatus {
    NONE,
    SELECTED,
    VALIDATING,
    VALIDATION_FAILED,
    UPLOADING,
    UPLOAD_FAILED,
    EXTRACTING,
    EXTRACT_FAILED,
    SAVING_TO_DB,
    FAILED_SAVE_DB,
    SAVED_TO_DB,
    CANCELLED
}

export class FileUiImportModel {
    fileName: String;
    status: FileStatus;
    uploadPercentage: number;
    progressBarType: String;
    fileToUpload: File;
    message: String;
    fileSize: number;


    validateAndUploadExcel() {
        this.validateExcel();
    }

    private validateExcel() {
        this.progressBarType = "indeterminate";
        this.status = FileStatus.VALIDATING;
        this.uploadPercentage = 0;
        this.message = "Validating Excel Sheet";
        setTimeout(() => {
            this.uploadExcel();
        },
            2000);
    }

    private uploadExcel() {
        this.progressBarType = "determinate";
        this.status = FileStatus.UPLOADING;
        this.uploadPercentage = 0;
        this.message = "Uploading File to Server";
        this.startTimerDummyUpload(10);
        setTimeout(() => {
            this.serverExtract();
        },
            10000);
    }

    private startTimerDummyUpload(seconds: number) {
        const timer$ = interval(1000);
        var curSec = 0;

        const sub = timer$.subscribe((sec) => {
            this.uploadPercentage = sec * 100 / seconds;
            curSec = sec;

            if (curSec === seconds) {
                sub.unsubscribe();
            }
        });
    }

    private serverExtract() {
        this.progressBarType = "indeterminate";
        this.status = FileStatus.EXTRACTING
        this.uploadPercentage = 0;
        this.message = "Extracting Data from file";
        setTimeout(() => {
            this.saveToDB();
        },
            2000);
    }

    private saveToDB() {
        this.progressBarType = "indeterminate";
        this.status = FileStatus.SAVING_TO_DB
        this.uploadPercentage = 0;
        this.message = "Saving extracted Data to DB";
        setTimeout(() => {
            this.status = FileStatus.SAVED_TO_DB
            this.message = "Success. Data added from Excel";
        },
            2000);
    }
}