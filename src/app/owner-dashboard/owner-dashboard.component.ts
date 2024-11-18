import { Component, OnInit } from '@angular/core';
import { HallService } from '../hall.service';
import { Router } from '@angular/router';

interface Hall {
  id: number;
  name: string;
  capacity: number;
  email: string;
  cost: number;
  location: string;
  phoneNumber: string;
  imageUrl: string;
}

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  halls: Hall[] = [];
  filteredHalls: Hall[] = [];
  hall: Hall = { 
    id: 0, name: '', capacity: 0, email: '', cost: 0, location: '', phoneNumber: '', imageUrl: '' 
  };
  isEditing = false;
  isFormVisible = false;
  searchQuery: string = '';
  // user: any;

  
  constructor(private hallService: HallService,private router: Router) {}

  ngOnInit(): void {
   

    this.loadHalls();
    // Retrieve user session data from localStorage
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // if (!this.user || !localStorage.getItem('auth_token')) {
    //   this.router.navigate(['/signin']);
    // }
  }
  


  closeForm() {
    this.isFormVisible = false;
  }

  
  loadHalls(): void {
    this.hallService.getHalls().subscribe((data) => {
      // this.halls = data;
      // this.filteredHalls = data; 
      this.halls = data.reverse(); // Reverse the halls array
      this.filteredHalls = [...this.halls]; // Create a copy for filtering
    });
  }

  
  toggleAddForm(): void {
    this.isFormVisible = !this.isFormVisible;
    this.isEditing = false;
    this.hall = { id: 0, name: '', capacity: 0, email: '', cost: 0, location: '', phoneNumber: '', imageUrl: '' }; // Reset the form
  }


  onSubmit(): void {

    if (this.hall.name) {
      this.hall.name = this.hall.name.charAt(0).toUpperCase() + this.hall.name.slice(1);
    }
  
    if (this.isEditing) {
      
      this.hallService.updateHall(this.hall).subscribe(() => {
        this.loadHalls(); 
        this.resetForm(); 
      });
    } else {

      this.hallService.addHall(this.hall).subscribe(() => {
        this.loadHalls();
        this.resetForm(); 
      });
    }
  }
  

 
  editHall(hall: Hall): void {
    this.hall = { ...hall }; 
    this.isEditing = true; 
    this.isFormVisible = true; 
  }

  // Delete a hall
  deleteHall(id: number): void {


    console.log("called");
    this.hallService.deleteHall(id).subscribe(() => {
      this.loadHalls(); 
    });
  }

 
  resetForm(): void {
    this.hall = { id: 0, name: '', capacity: 0, email: '', cost: 0, location: '', phoneNumber: '', imageUrl: '' }; // Reset the form fields
    this.isEditing = false;
    this.isFormVisible = false; 
  }

  
  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.filteredHalls = this.halls.filter((hall) =>
        hall.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredHalls = [...this.halls]; 
    }
  }


  // navigate() {
  //     this.router.navigate(['/booking/owner']); 
  // }
}
