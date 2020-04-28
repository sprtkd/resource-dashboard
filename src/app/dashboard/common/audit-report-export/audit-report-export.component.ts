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

  columnsToDisplay = ['name', 'ticketsClosed', 'customersAddressed', 'contactsMade', 'lastWorkedTicket'];
  headersToDisplay = ['Name', 'Tickets Closed', 'Customers Fulfilled', 'Contacts Made', 'Last Worked Ticket'];
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
    representativeUiAuditProfile.lastWorkedTicket = "Mr. Smith";
    representativeUiAuditProfile.tickets = [];
    representativeUiAuditProfile.ticketsClosed = 5;
    representativeUiAuditProfile.contactsMade = 20;
    representativeUiAuditProfile.customersAddressed = 2;
    this.auditProfileList.push(representativeUiAuditProfile);
    representativeUiAuditProfile = new RepresentativeUiAuditProfile();
    representativeUiAuditProfile.name = "Kyle";
    representativeUiAuditProfile.lastWorkedTicket = "Mr. Mario";
    representativeUiAuditProfile.tickets = [];
    representativeUiAuditProfile.ticketsClosed = 10;
    representativeUiAuditProfile.contactsMade = 25;
    representativeUiAuditProfile.customersAddressed = 4;
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
