import { Component, OnInit } from '@angular/core';
import { LinkUiModel } from 'src/app/models/link.ui.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean = false;
  listOfLinks: LinkUiModel[] = [];

  constructor() {
    
  }

  ngOnInit(): void {
    this.getNavbarUrls();
  }

  getNavbarUrls(){
    
    let username = localStorage.getItem("user");
    if(username!=null){
      this.isLoggedIn= true;
    }else{
      this.isLoggedIn= false;
    }
    if(this.isLoggedIn){
      this.listOfLinks = [];
      this.listOfLinks.push(
        { 'linkName': "Hello " + username, 'linkUri': "/home" },
        { 'linkName': "Dashboard", 'linkUri': "/app/dashboard" },
        { 'linkName': "Logs", 'linkUri': "/app/logs" },
        { 'linkName': "Logout", 'linkUri': "/logout" }
      )
    } else{
      this.listOfLinks = [];
      this.listOfLinks.push(
        { 'linkName': "Login", 'linkUri': "home/login" },
        { 'linkName': "Register", 'linkUri': "home/register" },
        { 'linkName': "Help", 'linkUri': "/help" }
      )
    }
  }

}
