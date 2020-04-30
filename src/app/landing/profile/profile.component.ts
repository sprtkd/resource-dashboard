import { Component, OnInit, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserUiProfile } from 'src/app/models/ui/user.ui.profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  causesRetain: string[] = ["Instant Service", "Mobile First", "Low Downtime", "Low Downtime", "Low Downtime"];
  causesClosed: string[] = ["High Maintenance Fee", "Death of Account Owner", "Low Interest Rate", "Low Downtime", "Low Downtime"];
  @Input() profileModel: UserUiProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
