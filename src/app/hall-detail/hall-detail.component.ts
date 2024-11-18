import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService } from '../hall.service';



@Component({
  selector: 'app-hall-detail',
  templateUrl: './hall-detail.component.html',
  styleUrls: ['./hall-detail.component.scss']
})
export class HallDetailComponent implements OnInit {
  hall: any;  // Object to hold the hall details
  hallId: string | null = null;
// State variables to manage visibility
isEmailVisible = true;
isPhoneVisible = true;

  constructor(private route: ActivatedRoute, private hallService: HallService) {}

  ngOnInit(): void {
    // Get the hall ID from the route params
    this.hallId = this.route.snapshot.paramMap.get('id');

    if (this.hallId) {
      this.fetchHallDetails(this.hallId);
    }
  }

  // Method to fetch hall details using a service or data
  fetchHallDetails(hallId: string): void {
    this.hallService.getHallById(hallId).subscribe((data) => {
      this.hall = data;
    });
  }
}
