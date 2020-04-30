import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { CustomerBackendModel, CustomerMultiUpload } from '../models/backend/customer.backend.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomerListUrl: string = "https://resource-dashboard-a.herokuapp.com/api/customers/customerlist";
  getSingleCustomerUrl: string = "https://resource-dashboard-a.herokuapp.com/api/customers/customer";
  uploadCustomersUrl: string = "https://resource-dashboard-a.herokuapp.com/api/customers";
  httpOptions = {};
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAllCustomers(): Observable<CustomerBackendModel[]> {
    return this.http.get<CustomerBackendModel[]>(this.getCustomerListUrl, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  fetchSingleCustomer(accountId: string): Observable<CustomerBackendModel> {
    return this.http.get<CustomerBackendModel>(this.getSingleCustomerUrl + "/" + accountId, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  addCustomerList(customerList: CustomerBackendModel[]) {
    return this.http.post(this.uploadCustomersUrl, this.getUploadCustomersModel(customerList), this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  getUploadCustomersModel(customerList: CustomerBackendModel[]): CustomerMultiUpload {
    let customerMultiUpload: CustomerMultiUpload = new CustomerMultiUpload();
    customerMultiUpload.accountList = customerList;
    return customerMultiUpload;
  }
}
