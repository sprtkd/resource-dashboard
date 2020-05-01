import { TicketBackendModel } from '../backend/ticket.backend.model';

export class RepresentativeUiAuditProfile {
    name: String;
    tickets: TicketBackendModel[];
    lastWorkedTicket: String;
    totalTickets: number;
    inprogressTickets: number;
    ticketsClosed: number;
    customersAddressed: number;
    customerRetries: number;
    contactsMade: number;
}