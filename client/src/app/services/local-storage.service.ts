

import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  appName = 'ideabox';
  save(name, data) {
    let appData = localStorage.getItem(this.appName);
    let appDataObj;
    if(appData) {
        appDataObj = JSON.parse(appData);
    } else {
        appDataObj= {};
    }

    appDataObj[name] = data;
    localStorage.setItem(this.appName, JSON.stringify(appDataObj));
  }

  get(name) {
	let data = JSON.parse(localStorage.getItem(this.appName));
  	if(!data) {
  		return undefined;
  	}
	if(name) {
  		return data[name];
  	}
  }
}