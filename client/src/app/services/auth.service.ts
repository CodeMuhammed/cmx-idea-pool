import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(userDetails): Observable<boolean> {
      // @TODO
      return Observable.of(true).delay(1000).do(val => {
          return this.isLoggedIn;
      });
  }

  signup(userDetails): Observable<boolean> {
      // @TODO
      return Observable.of(true).delay(1000).do(val => {
          return this.isLoggedIn;
      });
  }

  logout(): void {
      // @TODO call the endpoint to log user out then clear localstorage
      this.isLoggedIn = false;
  }

  refreshToken(): Observable<boolean> {
      // @TODO refresh the token and save to localstorage
      return Observable.of(true).delay(1000).do(val => {
          return true;
      });
  }
}