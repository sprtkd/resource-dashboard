export class TicketBackendModel {
    assignedTo: String;
    approvedBy: String;
    dateCreated: Date;
    dateClosed: Date
    ticketStatus: String;
    ticketHistory: TicketHistory[];
}

export class TicketHistory {
    createdBy: String;
    dateCreatedHist: Date;
    description: String;
    status: String;
}