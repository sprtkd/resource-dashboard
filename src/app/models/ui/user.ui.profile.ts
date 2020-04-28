import { UserUiLogin } from './user.ui.login';

export class UserUiProfile {
    userDetails: UserUiLogin;
    notificationList: String[];
    achievements: UserAchievement;
}

export class UserAchievement {
    ticketsClosed: number;
    customersAddressed: number;
    contactsMade: number;
    approvalsMade: number;
    representativesHandling: number;

    static getDummyAchievements(): UserAchievement {
        let achievement = new UserAchievement();
        achievement.approvalsMade = 2;
        achievement.contactsMade = 8;
        achievement.customersAddressed = 2;
        achievement.representativesHandling = 3;
        achievement.ticketsClosed = 5;
        return achievement;
    }
}