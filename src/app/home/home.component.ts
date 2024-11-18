import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      src: 'https://via.placeholder.com/1200x400?text=First+Slide',
      alt: 'First Slide',
      caption: 'This is the first slide'
    },
    {
      src: 'https://via.placeholder.com/1200x400?text=Second+Slide',
      alt: 'Second Slide',
      caption: 'This is the second slide'
    },
    {
      src: 'https://via.placeholder.com/1200x400?text=Third+Slide',
      alt: 'Third Slide',
      caption: 'This is the third slide'
    }
  ];
}
