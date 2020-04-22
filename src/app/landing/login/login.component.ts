import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/common/navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserUiLogin } from 'src/app/models/ui/user.ui.login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private navbar: NavbarComponent,
    private _snackBar: MatSnackBar, private loginService: LoginService) { }
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
    let userUiLogin: UserUiLogin = new UserUiLogin();
    userUiLogin.username = this.username.value;
    userUiLogin.password = this.password.value;
    let loginFlag: Boolean = false;
    this.loginService.tryLogin(userUiLogin)
      .subscribe((data: Boolean) => {
        console.log(data)
        loginFlag = data;
        if (loginFlag) {
          localStorage.setItem("user", this.username.value);
          this.navbar.ngOnInit();
          this.router.navigate(["app/dashboard"]);
          this.openSnackBar("Successfully Logged In", "Go to Home", "home");
        }
        else {
          this.openSnackBar("Login Failed", "Go to Home", "home");
        }
      },
        error => {
          this.openSnackBar(error, "Go to Home", "home");
        });



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
