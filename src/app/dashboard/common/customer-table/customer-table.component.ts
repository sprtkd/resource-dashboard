import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CustomerUiBasicModel, CustomerStatus } from 'src/app/models/ui/customer.ui.details.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerTableComponent implements OnInit {

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['accountNumber', 'name', 'contactNumber', 'status', 'lastTransactionDate'];
  fieldsToDisplay = ['A/C Number', 'Name', 'Contact', 'Status', 'Last Transacted'];
  expandedElement: CustomerUiBasicModel | null;
  constructor() { }


  ngOnInit(): void {
    this.expandedElement = null;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}




const ELEMENT_DATA: CustomerUiBasicModel[] = [
  {
    accountNumber: 15626464,
    name: "Hello World", contactNumber: "9830525222", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 272,
    name: "Mr Mario", contactNumber: "78271677681", lastTransactionDate: new Date(30101997), status: CustomerStatus.CLOSED
  },
  {
    accountNumber: 15626464,
    name: "DWW efrv", contactNumber: "7586278217", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 15626464,
    name: "Dr doom", contactNumber: "1585517555", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 15626464,
    name: "Spiderman", contactNumber: "947585222", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 15626464,
    name: "Hello World", contactNumber: "9830525222", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 15626464,
    name: "Hello World", contactNumber: "9830525222", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 15626464,
    name: "Hello World", contactNumber: "9830525222", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
  {
    accountNumber: 15626464,
    name: "Hello World", contactNumber: "9830525222", lastTransactionDate: new Date(), status: CustomerStatus.ACTIVE
  },
];
