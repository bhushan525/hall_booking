import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
declare var bootstrap: any; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'convention_hall_booking';

  isSigninOrSignupRoute: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if the current route is either /signin or /signup
      const currentRoute = this.router.url;
      this.isSigninOrSignupRoute = currentRoute === '/signin' || currentRoute === '/signup' || currentRoute === '/home';
    });
  }

  // Handle logout logic
  // logout(): void {
  //   // localStorage.removeItem('user');  
  //   // sessionStorage.removeItem('user'); 
  //   const confirmLogout = window.confirm('Are you sure you want to logout?');
  //   if (confirmLogout) {
  //     this.router.navigate(['/signin']).then(() => {

  //       window.history.pushState(null, '', '/signin');
  //       window.onpopstate = () => {
  //         window.history.go(1);  // Push forward on back button press
  //       };
  //     });
  //   } else {
  //     console.log('Logout canceled');
  //   }
  // }

  logout(): void {
    // Show the modal using Bootstrap's JS
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    logoutModal.show();
  }

  confirmLogout(): void {
    // Proceed with logout logic here
    localStorage.removeItem('user');
  localStorage.removeItem('auth_token');
    this.router.navigate(['/signin']).then(() => {
      window.history.pushState(null, '', '/signin');
      window.onpopstate = () => {
        window.history.go(1);  // Push forward on back button press
      };
    });

    // Close the modal after logout
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    logoutModal.hide();
  }

  cancelLogout(): void {
    console.log('Logout canceled');
    // Close the modal without logging out
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    logoutModal.hide();
  }
}
