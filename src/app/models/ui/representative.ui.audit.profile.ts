import { TicketBackendModel } from '../backend/ticket.backend.model';

export class RepresentativeUiAuditProfile {
    name: String;
    tickets: TicketBackendModel[];
    lastWorkedTicket: String;
    ticketsClosed: number;
    customersAddressed: number;
    contactsMade: number;
}