import { Component, OnInit, Input } from '@angular/core';
import { TicketHistory } from 'src/app/models/backend/ticket.backend.model';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css']
})
export class TicketHistoryComponent implements OnInit {

  @Input() olderTickets: TicketHistory[];
  constructor() { }

  ngOnInit(): void {
  }

}
