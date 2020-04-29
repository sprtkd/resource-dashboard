import { Component, OnInit, Input } from '@angular/core';
import { CustomerStatus } from 'src/app/models/ui/customer.ui.details.model';
@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.css']
})
export class StatusLabelComponent implements OnInit {

  @Input() statusInput: CustomerStatus;
  constructor() { }

  ngOnInit(): void {
  }
  getFormattedStatus(status: CustomerStatus) {
    return CustomerStatus[status];
  }
}
