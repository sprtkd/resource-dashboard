import { Component, OnInit } from '@angular/core';
import { CommonsService } from '../services/commons.service';
import { UserUiLogin } from '../models/ui/user.ui.login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileType: UserUiLogin;
  constructor(private commonsService: CommonsService) { }

  ngOnInit(): void {
    this.profileType = this.commonsService.getLoggedIn();
  }

}
