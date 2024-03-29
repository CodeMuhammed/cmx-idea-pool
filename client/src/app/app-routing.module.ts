import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
];
 
@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [ 
      RouterModule 
  ],
  providers: [],
})
export class AppRoutingModule {}