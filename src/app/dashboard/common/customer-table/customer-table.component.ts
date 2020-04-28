import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CustomerUiBasicModel, CustomerStatus, CustomerExtraDetails } from 'src/app/models/ui/customer.ui.details.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBackendModel } from 'src/app/models/backend/customer.backend.model';
import { CommonsService } from 'src/app/services/commons.service';
import { NavbarComponent } from 'src/app/common/navbar/navbar.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
  providers: [CustomerService],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerTableComponent implements OnInit {

  allCustomerList: CustomerUiBasicModel[] = [];
  dataSource: MatTableDataSource<CustomerUiBasicModel> = new MatTableDataSource([]);

  @Input() externalFilter: String;
  filterForAccount: String;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['accountNumber', 'name', 'contactNumber', 'status', 'lastTransactionDate'];
  fieldsToDisplay = ['A/C Number', 'Name', 'Contact', 'Status', 'Last Transacted'];
  expandedElement: CustomerUiBasicModel;
  constructor(private customerService: CustomerService, private commonsService: CommonsService, private navbar: NavbarComponent) { }


  ngOnInit(): void {
    this.expandedElement = null;
    this.filterForAccount = "All";
    this.allCustomerList = [];
    this.getAllCustomers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllCustomers() {
    this.navbar.spinnerStart();
    this.customerService.fetchAllCustomers()
      .subscribe((data: CustomerBackendModel[]) => {
        for (let currCustomer of data) {
          this.allCustomerList.push(CustomerUiBasicModel.transformBackendCustomerToUI(currCustomer));
        }
        this.dataSource = new MatTableDataSource(this.allCustomerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error => {
          this.commonsService.openSnackBar(error, "Failed to fetch Customers", null);
        }).add(() => {
          this.navbar.spinnerStop();
        });
  }

}
