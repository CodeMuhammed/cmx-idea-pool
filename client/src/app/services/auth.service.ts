import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { LocalStorageService }      from './local-storage.service';

@Injectable()
export class AuthService {
    constructor(private localStorageService: LocalStorageService, private router: Router, private http: Http) {}
    
    // store the URL so we can redirect after logging in
    redirectUrl: string;

    baseUrl() {
        return location.hostname == 'localhost' ? 'http://localhost:8001' : '';
    }

    login(userDetails) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({headers});

        return this.http.post(`${this.baseUrl()}/access-tokens`, userDetails, options)
            .map(this.parseData)
            .map((data) => {
                this.localStorageService.save('refresh_token', data.refresh_token);
                this.localStorageService.save('jwt', data.jwt);
                return true;
            })
            .catch((error) => {
                return this.handleError(error);
            });
    }

    signup(userDetails): Observable<boolean> {
        // @TODO
        return Observable.of(true).delay(1000).do(val => {
            return;
        });
    }

    logout(): void {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.getAccessToken()
        });
        let body = {
            refresh_token: this.getRefreshToken()
        };
        let options = new RequestOptions({headers, body});

        //call the endpoint to log user out
        this.http.delete(`${this.baseUrl()}/access-tokens`, options)
            .map(this.parseData)
            .catch((error) => {
                return Observable.throw('error');
            })
            .subscribe(
                (stat) => {
                    console.log(stat);
                    this.localStorageService.remove('refresh_token');
                    this.localStorageService.remove('jwt');
                    this.router.navigate(['/signin']);
                },
                (err) => { alert(err) }
            );
    }

    getAccessToken() {
        return this.localStorageService.get('jwt');
    }

    getRefreshToken() {
        return this.localStorageService.get('refresh_token');
    }

    isLoggedIn() {
        return this.localStorageService.get('refresh_token') ? true : false;
    }

    // This method parses the data to JSON
    private parseData(res: Response)  {
        return res.json() || [];
    }

    // Displays the error message
    private handleError(error: Response | any) {
        // if error was as a result of user token expiration, throw them out
        let errorMessage: string;
        errorMessage = error.message ? error.message : error.toString();
 
        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }
}