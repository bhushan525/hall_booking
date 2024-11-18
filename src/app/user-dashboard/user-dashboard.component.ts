import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HallService } from '../hall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userId: number | null = null;
  availableHalls: any[] = [];
  filteredHalls: any[] = [];
  hasNoHalls: boolean = false;
  cities: string[] = [];
  selectedCity: string = '';
  searchQuery: string = '';
  isPopupVisible: boolean = false;
  isModalOpen = false; // Control modal visibility
  selectedHall: any = null; 
  showModal = false;
  showBookingsSection = false; 
  userDetails = {
    id:0,
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    cost: 0
  };
  bookingDetails: any = {
    name: '',
    email: '',
    date: '',
    contact: '',
    additionalRequests: ''
  };

  constructor(private hallService: HallService,private route: ActivatedRoute,private bookingService:BookingService,private router:Router) {
    
  }


  ngOnInit(): void {
    // Call the getHalls() method and subscribe to the response
    this.hallService.getHalls().subscribe({
      next: (halls) => {
        this.availableHalls = halls;
        this.filteredHalls = halls;
        this.checkNoHalls();
        // this.cities = halls.map(hall=>hall.location)
        this.extractCities(halls);
        console.log('Halls fetched:', halls);
      },
      error: (error) => {
        // Handle any errors
        console.error('Error fetching halls:', error);
      }
    });

    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      console.log('User ID from query params:', this.userId);
    });
  }
  calculateCost(cost: number) {
    console.log(cost);
    console.log(this.userDetails.startDate);
    console.log(this.userDetails.endDate);
    if (this.userDetails.startDate && this.userDetails.endDate) {
      const startDate = new Date(this.userDetails.startDate);
      const endDate = new Date(this.userDetails.endDate);

      const duration = this.getDurationInDays(startDate, endDate);
      
      // Calculate the base cost based on the duration and hall cost
      let totalCost = cost * (duration+1);
      console.log(duration);
      // Apply 10% discount if the duration is more than 1 day
      if (duration >= 1) {
        totalCost = totalCost * 0.9; 
        console.log(totalCost);
      }
      
      // Set the total cost in userDetails
      this.userDetails.cost = totalCost;
    }
  }

  // Helper function to get the duration in days
  getDurationInDays(startDate: Date, endDate: Date): number {
    console.log('hi');
    const timeDifference = endDate.getTime() - startDate.getTime();
    return timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
  }

  extractCities(halls: any[]): void {
    const citySet = new Set<string>();  
    halls.forEach(hall => {
      citySet.add(hall.location);  
    });
    this.cities = Array.from(citySet);  // Convert the Set to an array
  }
  
  // showBookings() {
  //   this.showBookingsSection = !this.showBookingsSection;  // Toggle the view
  // }
  navigateToBooking() {
    if (this.userId) {
      // this.router.navigate(['/booking', this.userId]); // Passing the userId as part of the route
      this.router.navigate(['/booking', this.userId], { replaceUrl: true });

    }
  }
  
 
  callNow(phoneNumber: string): void {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }
  filterHallsByCity(): void {
    if (this.selectedCity) {
      this.hallService.getHallsByCity(this.selectedCity).subscribe({
        next: (halls) => {
          this.filteredHalls = halls;
          this.checkNoHalls();
          console.log('Filtered Halls by city:', halls);
        },
        error: (error) => {
          console.error('Error fetching halls by city:', error);
        }
      });
    } else {
      // If no city is selected, display all halls
      this.filteredHalls = this.availableHalls;
      this.checkNoHalls();
    }
  }
  filterHallsByName() {
    this.filteredHalls = this.availableHalls.filter(hall => 
      hall.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (!this.selectedCity || hall.location === this.selectedCity)
    );
    this.hasNoHalls = this.filteredHalls.length === 0;
  }
  checkNoHalls(): void {
    this.hasNoHalls = this.filteredHalls.length === 0;
  }


 

  // Open modal and set hall details
  openModal(hall: any) {
    this.selectedHall = hall; // Set the selected hall data
    this.userDetails = { ...this.userDetails, cost: hall.cost ,id:hall.id}; // Pass the hall cost
    this.isModalOpen = true;
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
    this.userDetails = {
      id:0,
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      cost: 0
    }; // Clear the form data when modal closes
  }

  // Handle booking submission
// Handle booking submission
submitBooking() {
  // Format startDate and endDate in the correct format: YYYY-MM-DDTHH:mm
  const formattedStartDate = new Date(this.userDetails.startDate).toISOString().slice(0, 16); // Slicing to keep only YYYY-MM-DDTHH:mm
  const formattedEndDate = new Date(this.userDetails.endDate).toISOString().slice(0, 16); // Slicing to keep only YYYY-MM-DDTHH:mm
  
  // Prepare the booking data to send to the API
  const bookingData = {
    userId: this.userId, // Use userId from query params or session
    hallId: this.userDetails.id, // Hall ID from the selected hall
    userName: this.userDetails.name,
    email: this.userDetails.email,
    phone: this.userDetails.phone,
    startDate: formattedStartDate, // Send formatted start date
    endDate: formattedEndDate, // Send formatted end date
    price: this.userDetails.cost, // Cost calculated based on the duration
    bookingDate: new Date().toISOString(), // Current date and time in ISO format
  };

  console.log(bookingData);

  // Call the API with the formatted data
  this.bookingService.confirmBooking(bookingData).subscribe(
    (response) => {
      console.log('Booking successful:', response);
      this.showModal = true; // Show success modal
      this.closeModal(); // Close the booking form modal
    },
    (error) => {
      console.error('Booking failed:', error);
      // Handle error (e.g., show an error message)
    }
  );
}



  closeNewModal(){
    this.showModal = false;
   
  }
}
