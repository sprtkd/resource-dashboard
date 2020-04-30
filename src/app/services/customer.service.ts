import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { CustomerBackendModel } from '../models/backend/customer.backend.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomerListUrl: string = "https://resource-dashboard-a.herokuapp.com/api/customers/customerlist";
  getSingleCustomerUrl: string = "https://resource-dashboard-a.herokuapp.com/api/customers/customer";
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
}
