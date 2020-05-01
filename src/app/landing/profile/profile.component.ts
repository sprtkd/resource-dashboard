import { Component, OnInit, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserUiProfile } from 'src/app/models/ui/user.ui.profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  causesRetain: string[] = ["Instant Service", "Mobile First", "Low Downtime", "Frequent PoS available", "Helpful Support Team"];
  causesClosed: string[] = ["High Maintenance Fee", "Death of Account Owner", "Low Interest Rate", "High Minimum Balance", "Bad Peer Feedback"];
  @Input() profileModel: UserUiProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
