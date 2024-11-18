import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallCardComponent } from './hall-card.component';

describe('HallCardComponent', () => {
  let component: HallCardComponent;
  let fixture: ComponentFixture<HallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HallCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
