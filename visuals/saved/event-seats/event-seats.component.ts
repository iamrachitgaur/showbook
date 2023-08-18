import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-seats',
  templateUrl: './event-seats.component.html',
  styleUrls: ['./event-seats.component.css'],
  inputs:['eventDateSeat']
})
export class EventSeatsComponent implements OnInit {
  eventDateSeat:any
  seats = {vip:5,platinum:18,gold:28,silver:30}
  vip:Array<number> = []
  platinum:Array<number> = []
  gold:Array<number> = []
  silver:Array<number> = []
  constructor() { }

  selectVipSeat(num){
    console.log(num,'vip')
  }

  ngOnInit(): void {
    for(var i=1;i<=this.eventDateSeat.eventDetail.seats.vip;i++){
      this.vip.push(i)
    }
    for(var i=1;i<=this.eventDateSeat.eventDetail.seats.platinum;i++){
      this.platinum.push(i)
    }
    for(var i=1;i<=this.eventDateSeat.eventDetail.seats.gold;i++){
      this.gold.push(i)
    }
    for(var i=1;i<=this.eventDateSeat.eventDetail.seats.silver;i++){
      this.silver.push(i)
    }
    console.log(this.eventDateSeat)
  }

}
