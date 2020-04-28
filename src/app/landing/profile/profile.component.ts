import { Component, OnInit, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserUiProfile } from 'src/app/models/ui/user.ui.profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profileModel: UserUiProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
