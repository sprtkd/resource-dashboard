import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepresentativeUiAuditProfile } from 'src/app/models/ui/representative.ui.audit.profile';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-audit-report-export',
  templateUrl: './audit-report-export.component.html',
  styleUrls: ['./audit-report-export.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AuditReportExportComponent implements OnInit {
  auditProfileList: RepresentativeUiAuditProfile[];
  dataSource: MatTableDataSource<RepresentativeUiAuditProfile> = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['name', 'totalTickets', 'ticketsClosed', 'inprogressTickets',
    'customersAddressed', 'contactsMade', 'customerRetries', 'lastWorkedTicket'];
  headersToDisplay = ['Name', 'Total Tickets', 'Tickets Closed', 'Tickets In Progress',
    'Customers Retained', 'Contacts Made', 'Retries', 'Last Worked Ticket'];
  expandedElement: RepresentativeUiAuditProfile;

  constructor() { }

  ngOnInit(): void {
    this.expandedElement = null;
    this.auditProfileList = [];
    this.getAllRepresentativesForReviewer();
  }

  getAllRepresentativesForReviewer() {
    //dummy
    let representativeUiAuditProfile: RepresentativeUiAuditProfile = new RepresentativeUiAuditProfile();
    representativeUiAuditProfile.name = "John";
    representativeUiAuditProfile.totalTickets = 20;
    representativeUiAuditProfile.ticketsClosed = 5;
    representativeUiAuditProfile.inprogressTickets = 7;
    representativeUiAuditProfile.customersAddressed = 2;
    representativeUiAuditProfile.contactsMade = 20;
    representativeUiAuditProfile.customerRetries = 3;
    representativeUiAuditProfile.lastWorkedTicket = "Mr. Smith";
    representativeUiAuditProfile.tickets = [];
    this.auditProfileList.push(representativeUiAuditProfile);
    representativeUiAuditProfile = new RepresentativeUiAuditProfile();
    representativeUiAuditProfile.name = "Kyle";
    representativeUiAuditProfile.totalTickets = 30;
    representativeUiAuditProfile.ticketsClosed = 15;
    representativeUiAuditProfile.inprogressTickets = 14;
    representativeUiAuditProfile.customersAddressed = 6;
    representativeUiAuditProfile.contactsMade = 40;
    representativeUiAuditProfile.customerRetries = 5;
    representativeUiAuditProfile.lastWorkedTicket = "Mr. Mario";
    representativeUiAuditProfile.tickets = [];
    this.auditProfileList.push(representativeUiAuditProfile);
    //dummy
    this.dataSource = new MatTableDataSource(this.auditProfileList);
    this.dataSource.sort = this.sort;
  }

  savePDF() {
    var element = document.getElementById('printReport');
    html2pdf(element);
  }

}
