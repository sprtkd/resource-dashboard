import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavbarUiModel } from 'src/app/models/ui/link.ui.model';

@Component({
  selector: 'app-material-navbar',
  templateUrl: './material-navbar.component.html',
  styleUrls: ['./material-navbar.component.css']
})
export class MaterialNavbarComponent {
  @Input() navbarUiModel: NavbarUiModel;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  readNotifictions() {
  }

}
