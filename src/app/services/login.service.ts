import { Injectable } from '@angular/core';
import { UserUiLogin } from '../models/ui/user.ui.login';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = "https://resource-dashboard-a.herokuapp.com/api/users/validate";
  httpOptions = {};
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  tryLogin(user: UserUiLogin): Observable<UserUiLogin> {
    return this.http.post<UserUiLogin>(this.loginUrl, user, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );

  }
}
