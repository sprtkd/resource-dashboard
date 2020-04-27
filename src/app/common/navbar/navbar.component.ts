import { Component, OnInit } from '@angular/core';
import { NavbarUiModel, NotificationUiModel } from 'src/app/models/ui/link.ui.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarUiModel: NavbarUiModel = new NavbarUiModel();
  ifShowSpinner: Boolean = false;
  constructor() {

  }

  ngOnInit(): void {
    this.spinnerStop();
    this.getNavbarUrls();
    this.getNotifications();
  }

  getNavbarUrls() {

    let username = localStorage.getItem("user");
    if (username != null) {
      this.navbarUiModel.isLoggedIn = true;
    } else {
      this.navbarUiModel.isLoggedIn = false;
    }
    if (this.navbarUiModel.isLoggedIn) {
      this.navbarUiModel.listOfLinks = [];
      this.navbarUiModel.listOfLinks.push(
        { 'linkName': "Hello " + username, 'linkUri': "/home" },
        { 'linkName': "Dashboard", 'linkUri': "/app/dashboard" },
        { 'linkName': "Logs", 'linkUri': "/app/logs" },
        { 'linkName': "Logout", 'linkUri': "/logout" },
        { 'linkName': "Help", 'linkUri': "/help" }
      )
    } else {
      this.navbarUiModel.listOfLinks = [];
      this.navbarUiModel.listOfLinks.push(
        { 'linkName': "Login", 'linkUri': "home/login" },
        { 'linkName': "Register", 'linkUri': "home/register" },
        { 'linkName': "Help", 'linkUri': "/help" }
      )
    }
  }

  getNotifications() {

    this.navbarUiModel.notificationModel = new NotificationUiModel();
    this.navbarUiModel.notificationModel.notificationList = [];
    if (this.navbarUiModel.isLoggedIn) {
      this.navbarUiModel.notificationModel.notificationList.push("Scheduled call with Mr Smith", "Request for Mr John approved");
      this.navbarUiModel.notificationModel.notificationCount
        = this.navbarUiModel.notificationModel.notificationList.length;
    }
    else {
      this.navbarUiModel.notificationModel.notificationCount = 0;
    }

  }

  spinnerStart() {
    this.ifShowSpinner = true;
  }

  spinnerStop() {
    this.ifShowSpinner = false;
  }

}
