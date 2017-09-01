import { Component }    from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(public authService: AuthService, public router: Router) {}
  userDetails;
  errorMessage;
  ngOnInit() {
    // we will initialize our form here
    this.userDetails = {
        email: '',
        password: ''
    };
  }

  login() {
    console.log(this.userDetails);
    this.authService.login(this.userDetails).subscribe(
      (status) => {
        let url = this.authService.redirectUrl || '/dashboard';
        this.router.navigate([url]);
      },
      (err) => {
         this.errorMessage = 'Invalid username or password';
      }
    );
  }

  resetError() {
    this.errorMessage = undefined;
  }
}