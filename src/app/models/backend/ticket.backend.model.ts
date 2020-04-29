export class TicketBackendModel {
    assignedTo: String;
    approvedBy: String;
    dateCreated: Date;
    dateClosed: Date
    ticketStatus: string;
    ticketHistory: TicketHistory[];
    ticketId: String;
}

export class TicketHistory {
    createdBy: String;
    dateCreatedHist: Date;
    description: String;
    status: String;
}