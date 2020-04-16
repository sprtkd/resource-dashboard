import { Component, OnInit } from '@angular/core';
import { LinkUiModel } from 'src/app/models/link.ui.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  listOfLinks: LinkUiModel[] = [];

  constructor() {
    this.listOfLinks.push(
      { 'linkName': "Home", 'linkUri': "/home" },
      { 'linkName': "Dashboard", 'linkUri': "/app/dashboard" },
      { 'linkName': "Logs", 'linkUri': "/app/logs" },
      { 'linkName': "Logout", 'linkUri': "abc" },
      { 'linkName': "Login", 'linkUri': "home/login" },
      { 'linkName': "Register", 'linkUri': "home/register" }
    )
  }

  ngOnInit(): void {
  }

}
