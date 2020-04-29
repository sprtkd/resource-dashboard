import { TicketBackendModel } from './ticket.backend.model';

export class CustomerBackendModel {
    accountNum: String;
    customerName: String;
    emailId: String;
    contact: number;
    accountStatus: string;
    lastTranDate: Date;
    ticketRaised: String;
    address: String;
    ticketid: TicketBackendModel;
}