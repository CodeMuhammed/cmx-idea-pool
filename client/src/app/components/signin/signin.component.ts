import { Component }    from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  title = 'Sign in!';
  userDetaiils = {};
  constructor(public authService: AuthService, public router: Router) {}

  login() {
    this.authService.login(this.userDetaiils).subscribe((status) => {
      let url = this.authService.redirectUrl || '/dashboard';
      this.router.navigate([url]);
    });
  }
}