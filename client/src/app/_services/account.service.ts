import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { IUser } from '../_models/user.interface';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presence: PresenceService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: IUser) => {
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
        // 'user' isn't modified in the map() function, so no need to return
        // however, if we did make changes to the user, we'd 'return' it
        // return user;
      })
    )
  }

  setCurrentUser(user: IUser) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    // if user has only one role "Member" typically, it comes 
    // back as a simple string, not an array of strings...
    // we want an array - which is what user.roles expects
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
