import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8081/api/bookings/book'; // Replace with actual API URL
  private bookapiUrl = 'http://localhost:8081/api/bookings/user/';
  private getBookingapiUrl='http://localhost:8081/api/bookings/getAllBookings';
  constructor(private http: HttpClient) {}

  // Method to make the booking API call
  confirmBooking(bookingDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, bookingDetails);
  }

  getBookings(userId: number): Observable<any[]> {

    console.log(`user id is ${userId}`);

    return this.http.get<any[]>(`${this.bookapiUrl}${userId}`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get<any>(`${this.getBookingapiUrl}`);  
  }
}
