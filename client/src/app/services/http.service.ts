import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { LocalStorageService }      from './local-storage.service';

@Injectable()
export class HttpService {
    private baseUrl;

    constructor(private localStorageService: LocalStorageService, private http: Http) {
        this.baseUrl = location.hostname == 'localhost' ? 'http://localhost:8001' : '';
    }

    request(url, options) {
        return Observable.create((observer) => {
            let fullUrl = `${this.baseUrl}${url}`;
            this.http.request(fullUrl, options)
                .map(this.parseData)
                .subscribe(
                    (data) => {
                        observer.next(data);
                    },
                    (err) => {
                        // @TODO if error is 401, refresh token then retry the request again
                        console.log('Lets see what happens');
                        console.log(err);
                        observer.error(err);
                    }
                );
        });
    }

    private parseData(res: Response)  {
        return res.json() || [];
    }

    private addDefaultHeaders(config) {
        return new Headers({
            'Content-Type': 'application/json',
            'x-access-token': config.auth? this.localStorageService.get('jwt') : ''
        });
    } 

    get(url: string, config: any) {
        let headers = this.addDefaultHeaders(config);
        let options = new RequestOptions({
            headers,
            method: 'GET'
        });

        return Observable.create((observer) => {
            this.request(url, options)
                .subscribe(
                    (data) => {
                        observer.next(data);
                    },
                    (err) => {
                        observer.error(err);
                    }
                );
        });
    }

    post(url: string, body: any, config: any) {
        let headers = this.addDefaultHeaders(config);
        let options = new RequestOptions({
            headers,
            method: 'POST',
            body
        });

        return Observable.create((observer) => {
            this.request(url, options)
                .subscribe(
                    (data) => {
                        observer.next(data);
                    },
                    (err) => {
                        observer.error(err);
                    }
                );
        });
    }

    put(url, body, config) {
        let headers = this.addDefaultHeaders(config);
        let options = new RequestOptions({
            headers,
            method: 'PUT',
            body
        });

        return Observable.create((observer) => {
            this.request(url, options)
                .subscribe(
                    (data) => {
                        observer.next(data);
                    },
                    (err) => {
                        observer.error(err);
                    }
                );
        });
    }

    delete(url, body, config) {
        let headers = this.addDefaultHeaders(config);
        let options = new RequestOptions({
            headers,
            method: 'DELETE',
            body
        });

        return Observable.create((observer) => {
            this.request(url, options)
                .subscribe(
                    (data) => {
                        observer.next(data);
                    },
                    (err) => {
                        observer.error(err);
                    }
                );
        });
    }
}