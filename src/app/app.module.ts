import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActivityComponent } from './components/activity/activity.component';
import { HomeComponent } from './components/home/home.component';

//Services 
import {DataapiService} from "src/app/services/dataapi.service";
import {AuthService} from "src/app/services/auth.service";
import { NavbarService } from 'src/app/services/navbar.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ActivityComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataapiService,
    AuthService,
    NavbarService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
