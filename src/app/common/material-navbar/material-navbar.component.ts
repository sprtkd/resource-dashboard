import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LinkUiModel } from 'src/app/models/link.ui.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-navbar',
  templateUrl: './material-navbar.component.html',
  styleUrls: ['./material-navbar.component.css']
})
export class MaterialNavbarComponent {
  notificationCount: number;
  notificationList: String[] = [];
  @Input() navbarLinks: LinkUiModel[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _snackBar: MatSnackBar) {
    this.notificationList = ["Hi", "Hello", "Forgot to implement"]
    this.notificationCount = this.notificationList.length;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

   
  }

  readNotifictions(){
    this.notificationList = [];
    this.notificationCount = 0;
  }

}
