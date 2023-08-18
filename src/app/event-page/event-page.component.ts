import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  inputs:['selectedEvent'],
  outputs:['eventDateSeat']
})
export class EventPageComponent implements OnInit {
  selectedEvent:any
  eventDateSeat = new EventEmitter();
  constructor() { }

  selectedEventSlot(eventDateTime,event){
    console.log({selectedDateTime:eventDateTime},event)
    this.eventDateSeat.emit({selectedDateTime:eventDateTime,eventDetail:event})
  }

  ngOnInit(): void {
  }

}
