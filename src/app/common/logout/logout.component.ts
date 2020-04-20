import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private navbar: NavbarComponent, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.removeItem("user");
    this.navbar.ngOnInit();
    this.router.navigate(['home']);
    this.openSnackBar("Logged Out", "Login Again", "home/login");
  }

  openSnackBar(message: string, action: string, uri: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    }).onAction()
      .subscribe(() => this.router.navigateByUrl(uri));
  }

}
