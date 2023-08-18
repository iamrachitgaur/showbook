import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSeatsComponent } from './event-seats.component';

describe('EventSeatsComponent', () => {
  let component: EventSeatsComponent;
  let fixture: ComponentFixture<EventSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSeatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
