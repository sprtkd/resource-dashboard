import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, uri: string) {
    if (uri != null) {
      this._snackBar.open(message, action, {
        duration: 2000,
      }).onAction()
        .subscribe(() => this.router.navigateByUrl(uri));
    }
    else {
      this._snackBar.open(message, action, {
        duration: 2000,
      })
    }
  }

  getLoggedIn() {
    let username = localStorage.getItem("user");
    return username;
  }
}
