import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { TicketBackendModel, TicketHistory } from '../models/backend/ticket.backend.model';
import { DatePipe } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  ticketUrl: string = "https://resource-dashboard-a.herokuapp.com/api/tickets";
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  initiateCustomer(accountNum: String, username: String): Observable<TicketBackendModel> {
    return this.http.post<TicketBackendModel>(this.ticketUrl + "/" + accountNum, this.getInitiatedTicketModel(username)).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  getInitiatedTicketModel(username: String): TicketBackendModel {
    let ticketBackendModel: TicketBackendModel = new TicketBackendModel();
    ticketBackendModel.approvedBy = null;
    ticketBackendModel.assignedTo = username;
    ticketBackendModel.dateCreated = new Date();
    ticketBackendModel.dateClosed = null;
    ticketBackendModel.ticketStatus = "INITIATED";
    let ticketHistory: TicketHistory = new TicketHistory();
    ticketHistory.createdBy = ticketBackendModel.assignedTo;
    ticketHistory.dateCreatedHist = ticketBackendModel.dateCreated;
    ticketHistory.description = "Ticket assigned";
    ticketHistory.status = ticketBackendModel.ticketStatus;
    ticketBackendModel.ticketHistory = [];
    ticketBackendModel.ticketHistory.push(ticketHistory);
    return ticketBackendModel;
  }
}
