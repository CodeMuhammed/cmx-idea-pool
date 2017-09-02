import { Component } from '@angular/core';
import { AuthService }  from '../../services/auth.service';
import { Router }      from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    constructor(public authService: AuthService, public router: Router) {}
    userDetails;
    errorMessage;
    ngOnInit() {
      // we will initialize our form here
      this.userDetails = {
          email: '',
          name: '',
          password: ''
      };
    }

    signup() {
      console.log(this.userDetails);
      this.authService.signup(this.userDetails).subscribe(
        (status) => {
          let url = this.authService.redirectUrl || '/signin';
          this.router.navigate([url]);
        },
        (err) => {
          this.errorMessage = 'A user with this email already exists on the server';
        }
      );
    }

    resetError() {
      this.errorMessage = undefined;
    }
}