import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   constructor(private authService: AuthService, private userService: UserService) {}
   
   user = { name: '' };
   ngOnInit() {
       this.userService.user()
           .subscribe(
               (data) => {
                   this.user = data;
               },
               (err) => {
                   alert(err);
               }
           );
   }

   logout() {
       this.authService.logout();
   }
}