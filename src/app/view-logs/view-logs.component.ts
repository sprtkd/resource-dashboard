import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core'

export interface UserData {
  id: string;
  name: string;
  log: string;
}


const Logs: string[] = ['Created by: Roy, Status: Initiated, Date: 27/04/2020'];

const NAMES: string[] = [
  'Gayatri', 'Roshni', 'Rini', 'Sonam', 'suprotik', 'Rohini', 'Komal', 'Mahesh', 'Ankush', 'Rama',
  'Vikrant', 'Vikram', 'Atish', 'Shikha', 'Harshita', 'Priyanka', 'Priya', 'Alok', 'ravi'
];


@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'log'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    log: Logs[Math.round(Math.random() * (Logs.length - 1))],
    // progress: Math.round(Math.random() * 100).toString(),
    //color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}