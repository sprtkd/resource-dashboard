import { Component, OnInit } from '@angular/core';
import { CommonsService } from '../services/commons.service';
import { UserUiProfile, UserAchievement } from '../models/ui/user.ui.profile';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  userProfile: UserUiProfile;
  isLoggedIn: Boolean;
  constructor(private commonsService: CommonsService) { }

  ngOnInit(): void {
    if (this.commonsService.getLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.userProfile = null;
    if (this.isLoggedIn) {
      this.filllUserProfile();
    }
  }

  filllUserProfile() {
    this.userProfile = new UserUiProfile();
    this.userProfile.userDetails = this.commonsService.getLoggedIn();
    this.userProfile.notificationList = this.getAllNotificationList();
    this.userProfile.achievements = this.getAllAchievements();
  }

  getAllNotificationList(): String[] {
    return ["12 new dormant customers unassigned.", "Your ticket has been approved.", "You have closed 30 tickets in this week!"];
  }

  getAllAchievements(): UserAchievement {
    let myachievement: UserAchievement = UserAchievement.getDummyAchievements();
    return myachievement;
  }

}
