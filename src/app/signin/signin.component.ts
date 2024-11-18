import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  credentials = { email: '', password: '' };
  errorMessage:string = '';
  constructor(private authService: AuthService,private router:Router) {}
  // Variable to track password visibility
  isPasswordVisible: boolean = false;

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  signin() {
    this.authService.signin(this.credentials).subscribe(
      response => {
        // console.log(response.user.id);
        // localStorage.setItem('user', JSON.stringify(response.user)); // Storing user detail
        // Assuming 'response' is the object received after login
  if (response.user.role === 'user') {
  this.router.navigate(['/userdashboard'],{ queryParams: { id: response.user.id } });  // Navigate to the user dashboard
} else if (response.user.role === 'admin') {
 
  this.router.navigate(['/ownerdashboard']);  // Navigate to the admin/owner dashboard
} else {
  this.errorMessage = response.message;  // Show an error message if the role is unknown
}

        //console.log('Sign In Success', response);
        //alert("Logged In Succesfully");
      },
      error => {
        console.error('Sign In Error', error);
        alert("Invalid Credentials");
      }
    );
  }
}
