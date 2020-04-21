import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileType: String;
  constructor() { }

  ngOnInit(): void {
    this.profileType = "supportRep";
  }

}
