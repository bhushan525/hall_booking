import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';

import { HallCardComponent } from './hall-card/hall-card.component';
import { HallDetailComponent } from './hall-detail/hall-detail.component';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { OwnerBookingsComponent } from './owner-bookings/owner-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    OwnerDashboardComponent,
    UserDashboardComponent,
    HallCardComponent,
    HallDetailComponent,
    HomeComponent,
    UserBookingsComponent,
    OwnerBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
