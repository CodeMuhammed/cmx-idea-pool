import { Injectable } from '@angular/core';
import { AuthService }      from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class IdeasService {
    constructor(private authService: AuthService) {}
}