import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';  // Import the service
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = [];  // Array to hold the bookings
  userId: number | null = null;

  constructor(private bookingService: BookingService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // Capture the userId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!; // Convert to number using '+'
      console.log('User ID received:', this.userId);
      
      if (this.userId !== null) {
        // Fetch bookings after userId is available
        this.fetchBookings(this.userId);
      } else {
        console.error('Invalid or missing userId');
      }
    });
  }

  fetchBookings(userId: number): void {
    if (userId) {  // Ensure userId is valid before making the API call
      this.bookingService.getBookings(userId).subscribe(
        (data) => {
          this.bookings = data;  // Store the bookings in the component
          console.log('Bookings fetched:', this.bookings);
        },
        (error) => {
          console.error('Error fetching bookings:', error);
        }
      );
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/userdashboard']);  // Adjust the route if needed
  }
}
