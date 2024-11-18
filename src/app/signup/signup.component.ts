import { Component } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {name: '', password: '', email: '' ,mobileNumber:'', city:'',role:''};
  showModal = false;
  constructor(private authService: AuthService,private router:Router) {}
  isPasswordVisible: boolean = false;

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  signup() {
    this.authService.signup(this.user).subscribe(
      response => {
        console.log('Sign Up Success', response);
        this.showModal = true;
        // alert("User Registered Succesfully");
      },
      error => {
        console.error('Sign Up Error', error);
      }
    );
  }


  closeModal() {
    this.showModal = false;
    this.router.navigate(['/signin']);
  }
}
