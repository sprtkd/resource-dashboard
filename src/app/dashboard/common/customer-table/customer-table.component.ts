import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CustomerUiBasicModel, CustomerStatus, CustomerExtraDetails } from 'src/app/models/ui/customer.ui.details.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBackendModel } from 'src/app/models/backend/customer.backend.model';
import { CommonsService } from 'src/app/services/commons.service';

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
  filterForAccount: String;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['accountNumber', 'name', 'contactNumber', 'status', 'lastTransactionDate'];
  fieldsToDisplay = ['A/C Number', 'Name', 'Contact', 'Status', 'Last Transacted'];
  expandedElement: CustomerUiBasicModel | null;
  constructor(private customerService: CustomerService, private commonsService: CommonsService) { }


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
    this.customerService.fetchAllCustomers()
      .subscribe((data: CustomerBackendModel[]) => {
        for (let currCustomer of data) {

          this.allCustomerList.push(this.transformBackendCustomerToUI(currCustomer));

        }
        this.dataSource = new MatTableDataSource(this.allCustomerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error => {
          this.commonsService.openSnackBar(error, "Failed to fetch Customers", null);
        });
  }

  transformBackendCustomerToUI(customerBackendModel: CustomerBackendModel): CustomerUiBasicModel {

    var currCustomerUiBasicModel: CustomerUiBasicModel = new CustomerUiBasicModel();
    currCustomerUiBasicModel.accountNumber = customerBackendModel.accountNum;
    currCustomerUiBasicModel.contactNumber = customerBackendModel.contact;
    currCustomerUiBasicModel.lastTransactionDate = customerBackendModel.lastTranDate;
    currCustomerUiBasicModel.name = customerBackendModel.customerName;
    currCustomerUiBasicModel.status = CustomerStatus[customerBackendModel.accountStatus];
    currCustomerUiBasicModel.moreDetails = new CustomerExtraDetails();
    currCustomerUiBasicModel.moreDetails.address = customerBackendModel.address;
    currCustomerUiBasicModel.moreDetails.emailId = customerBackendModel.emailId;
    currCustomerUiBasicModel.moreDetails.ticketRaised = customerBackendModel.ticketRaised;
    return currCustomerUiBasicModel;
  }

}
