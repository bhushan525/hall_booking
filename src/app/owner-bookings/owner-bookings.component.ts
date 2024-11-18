import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-owner-bookings',
  templateUrl: './owner-bookings.component.html',
  styleUrls: ['./owner-bookings.component.css']
})
export class OwnerBookingsComponent implements OnInit {
  bookings: any[] = [];  // Store bookings here

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();  // Call the fetchBookings method when the component initializes
  }

  fetchBookings(): void {
    // Fetch all bookings without checking for a user ID
    console.log('called');
    this.bookingService.getAllBookings().subscribe(
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
