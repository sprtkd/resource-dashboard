import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/common/navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private navbar: NavbarComponent, private _snackBar: MatSnackBar) { }
  hidePassword: Boolean = true;
  toBeRemebered = new FormControl('');
  username = new FormControl('', [Validators.required, Validators.minLength(1)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);

  ngOnInit(): void {
    let username = localStorage.getItem("user");
    if (username != null) {
      this.router.navigate(["app/dashboard"]);
      this.openSnackBar("You are already logged in", "Logout", "logout");
    }
    this.toBeRemebered.setValue(true);
  }

  login(): void {
    localStorage.setItem("user", this.username.value);
    this.navbar.ngOnInit();
    this.router.navigate(["app/dashboard"]);
    this.openSnackBar("Successfully Logged In", "Go to Home", "home");
  }

  isLoginValid(): Boolean {
    return (this.username.valid && this.password.valid);
  }

  openSnackBar(message: string, action: string, uri: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    }).onAction()
      .subscribe(() => this.router.navigateByUrl(uri));
  }

}
