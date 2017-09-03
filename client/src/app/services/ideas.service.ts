import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService }      from './http.service';

@Injectable()
export class IdeasService {
    constructor(private router: Router, private httpService: HttpService) {}

    path = '/ideas';

    getIdeas(page: number) {
        return this.httpService.get(`${this.path}?page=${page}`, { auth: true });
    }

    createIdea(idea) {
        delete idea._id; // this dummy id should not go to the server
        return this.httpService.post(this.path, idea, { auth: true });
    }

    updateIdea(idea) {
        return this.httpService.put(`${this.path}/${idea._id}`, idea, { auth: true });
    }

    deleteIdea(idea) {
        return this.httpService.delete(`${this.path}/${idea._id}`, null, { auth: true });
    }
}