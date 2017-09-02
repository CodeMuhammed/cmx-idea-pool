import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//componts
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdeaViewComponent } from './components/idea-view/idea-view.component';
import { IdeaEditComponent } from './components/idea-edit/idea-edit.component';

import { AppRoutingModule } from './app-routing.module';

//services
import { AuthGuard } from './services/auth-guard.service';
import { AuthService }      from './services/auth.service';
import { IdeasService }      from './services/ideas.service';
import { LocalStorageService }      from './services/local-storage.service';
import { HttpService }      from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    IdeaViewComponent,
    IdeaEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [    
    AuthGuard,
    AuthService,
    IdeasService,
    LocalStorageService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
