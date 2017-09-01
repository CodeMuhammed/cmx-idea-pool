import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { LocalStorageService }      from './local-storage.service';

@Injectable()
export class AuthService {
    authObj = {
        "refresh_token": "BVA5iNua7Oelqotv19xHOCwq0kf8pA5L",
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJjb2RlbXVoYW1kbWRlZEBnbWFpbC5jb20iLCJpYXQiOjE1MDQyNjAzMTIsImV4cCI6MTUwNDMyMDMxMn0._Z3I45OWiUG1Eyo450DvxL3yq0n3qoXDVyBJqZMxmJM"
    };

    constructor(private localStorageService: LocalStorageService) {
        localStorageService.save('refresh_token', this.authObj.refresh_token);
        localStorageService.save('jwt', this.authObj.jwt);
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(userDetails): Observable<boolean> {
        // @TODO
        return Observable.of(true).delay(1000).do(val => {
            return;
        });
    }

    signup(userDetails): Observable<boolean> {
        // @TODO
        return Observable.of(true).delay(1000).do(val => {
            return;
        });
    }

    logout(): void {
        // @TODO call the endpoint to log user out then clear localstorage
    }

    refreshToken(): Observable<boolean> {
        // @TODO refresh the token and save to localstorage
        return Observable.of(true).delay(1000).do(val => {
            return true;
        });
    }

    getAccessToken() {
        return this.localStorageService.get('jwt');
    }

    isLoggedIn() {
        return this.localStorageService.get('refresh_token') ? true : false;
    }
}