export class LinkUiModel {
  linkName: String;
  linkUri: String;
}

export class NavbarUiModel {
  isLoggedIn: Boolean;
  listOfLinks: LinkUiModel[];
  notificationModel: NotificationUiModel;
}

export class NotificationUiModel {
  notificationCount: number;
  notificationList: String[];
}