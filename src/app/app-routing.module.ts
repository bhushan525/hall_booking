import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';

import { HallDetailComponent } from './hall-detail/hall-detail.component';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { OwnerBookingsComponent } from './owner-bookings/owner-bookings.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },  // Redirect to signup by default
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'ownerdashboard', component: OwnerDashboardComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  // { path: 'hall/:id', component: HallDetailComponent },
  {path: 'hall-detail/:id', component: HallDetailComponent},
  { path: 'booking/:userId', component: UserBookingsComponent },
  { path: 'ownerbooking', component: OwnerBookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
