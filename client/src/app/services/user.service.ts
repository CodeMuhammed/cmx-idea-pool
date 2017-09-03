import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService }      from './http.service';

@Injectable()
export class UserService {
    constructor(private router: Router, private httpService: HttpService) {}

    path = '/me';

    user() {
        return this.httpService.get(this.path, { auth: true });
    }
}