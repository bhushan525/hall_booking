import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


interface Hall {
  id: number;
  name: string;
  capacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = 'http://localhost:8081/api/halls';

  constructor(private http: HttpClient) {}

  // Fetch all halls 
  getHalls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getHallById(hallId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${hallId}`);
  }
  // Fetch halls by city
  getHallsByCity(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/location/${city}`);
  }

  // Fetch hall details by ID (for the Hall Detail page)
  getHallDetails(hallId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${hallId}`);
  }

   // Add a new hall (POST request)
   addHall(hall: Hall): Observable<Hall> {
    // Ensure that all required fields are provided
    const newHall = {
      ...hall, // Spread operator to include all hall properties
    };

    return this.http.post<Hall>(this.apiUrl, newHall);
  }

  // Update an existing hall (PUT request)
  updateHall(hall: Hall): Observable<Hall> {
    // Ensure that all required fields are included
    console.log("called");
    const updatedHall = {
      ...hall, // Spread operator to include all hall properties
    };
  
    return this.http.put<Hall>(`${this.apiUrl}/${hall.id}`, updatedHall).pipe(
      tap(response => {
        console.log("Response received:", response); // Log the response
      })
    );
  }
  // Delete a hall by ID (DELETE request)
  deleteHall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
