import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hall-card',
  templateUrl: './hall-card.component.html',
  styleUrls: ['./hall-card.component.scss']
})
export class HallCardComponent {
  @Input() hall: any;
}
