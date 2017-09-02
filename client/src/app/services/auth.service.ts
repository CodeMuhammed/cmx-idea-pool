import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { LocalStorageService } from './local-storage.service';
import { HttpService }      from './http.service';

@Injectable()
export class AuthService {
    constructor(private localStorageService: LocalStorageService, private router: Router, private httpService: HttpService) {}
    path = '/access-tokens';
    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(userDetails) {
        return this.httpService.post(this.path, userDetails, { auth: false })
                    .map((data) => {
                        this.localStorageService.save('refresh_token', data.refresh_token);
                        this.localStorageService.save('jwt', data.jwt);
                        return true;
                    });
    }

    signup(userDetails) {
        return this.httpService.post('/users', userDetails, { auth: false })
                   .map((data) => {
                        this.localStorageService.save('refresh_token', data.refresh_token);
                        this.localStorageService.save('jwt', data.jwt);
                        return true;
                    });
    }

    logout(): void {
        let body = {
            refresh_token: this.localStorageService.get('refresh_token')
        };
        this.httpService.delete(this.path, body, { auth: true })
            .subscribe(
                (stat) => {
                    this.localStorageService.remove('refresh_token');
                    this.localStorageService.remove('jwt');
                    this.router.navigate(['/signin']);
                },
                (err) => { alert(err) }
            );
    }

    isLoggedIn() {
        return this.localStorageService.get('refresh_token') ? true : false;
    }
}