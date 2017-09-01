import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

// All the RxJS stuff we need
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { AuthService }  from './auth.service';

@Injectable()
export class IdeasService {
    baseUrl = this.setBaseUrl();
    constructor(private authService: AuthService, private http: Http, private router: Router) {}
    
    setBaseUrl() {
        return location.hostname == 'localhost' ? 'http://localhost:8001' : '';
    }

    createIdea() {

    }

    getIdeas() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.authService.getAccessToken()
        });
        let options = new RequestOptions({headers});

        return this.http.get(`${this.baseUrl}/ideas`, options)
            .map(this.parseData)
            .catch((error) => {
                if(error.status === 401 || error.status === 403) 
                    this.router.navigate(['/signin']);

                return this.handleError(error);
            });
    }

    updateIdea() {

    }

    deleteIdea() {

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