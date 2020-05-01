import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerUiBasicModel } from 'src/app/models/ui/customer.ui.details.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-table-commonview',
  templateUrl: './customer-table-commonview.component.html',
  styleUrls: ['./customer-table-commonview.component.css']
})
export class CustomerTableCommonviewComponent implements OnInit {
  @Input() displayedColumns: string[];
  @Input() selectedDatasource: MatTableDataSource<any>;
  constructor() { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.selectedDatasource.paginator = this.paginator;
    this.selectedDatasource.sort = this.sort;
  }

}
