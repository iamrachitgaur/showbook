import { Component, EventEmitter, OnInit } from '@angular/core';
import {AuthServiceService} from '../service/auth-service.service'
@Component({
  selector: 'app-event-seats',
  templateUrl: './event-seats.component.html',
  styleUrls: ['./event-seats.component.css'],
  inputs:['eventDateSeat'],
  outputs:['paymentEmit']
})
export class EventSeatsComponent implements OnInit {

  eventDateSeat:any

  paymentEmit = new EventEmitter();

  vip:Array<any> = []
  platinum:Array<any> = []
  gold:Array<any> = []
  silver:Array<any> = []

  rowAlphabetArray:Array<string> = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  vipSeatPrize:number
  platinumSeatPrize:number
  goldSeatPrize:number
  silverSeatPrize:number

  totalPrize:number = 0

  selectedSeatArray:Array<any> = []

  constructor(private authService:AuthServiceService) { }

  
  selectedSeat(seat,selectedSeatElement:HTMLDivElement){
    console.log(this.selectedSeatArray)
    if(seat.seatStatus == 'available'){
      var seats = document.getElementsByClassName("seat")
      
      for(var i=0;i<seats.length;i++){
        
        if(seats[i] == selectedSeatElement && seats[i].classList.contains('available')){
          seats[i].classList.replace('available','selected')
          this.selectedSeatArray.push(seat)
          if(seat.seatType == 'vip'){ this.totalPrize = this.totalPrize+this.vipSeatPrize }
          if(seat.seatType == 'platinum'){ this.totalPrize = this.totalPrize+this.platinumSeatPrize }
          if(seat.seatType == 'gold'){ this.totalPrize = this.totalPrize+this.goldSeatPrize }
          if(seat.seatType == 'silver'){ this.totalPrize = this.totalPrize+this.silverSeatPrize }

        }
        else if(seats[i] == selectedSeatElement && seats[i].classList.contains('selected')){
          seats[i].classList.replace('selected','available')
          var index = this.selectedSeatArray.indexOf(seat)
          if(index > -1){
            this.selectedSeatArray.splice(index, 1);
            if(seat.seatType == 'vip'){ this.totalPrize = this.totalPrize-this.vipSeatPrize }
            if(seat.seatType == 'platinum'){ this.totalPrize = this.totalPrize-this.platinumSeatPrize }
            if(seat.seatType == 'gold'){ this.totalPrize = this.totalPrize-this.goldSeatPrize }
            if(seat.seatType == 'silver'){ this.totalPrize = this.totalPrize-this.silverSeatPrize }
          }
        }

      }

    }
  }


  seatPayment(){
    this.paymentEmit.emit({totalPrize:this.totalPrize,seats:this.selectedSeatArray})
  }


  ngOnInit(): void {
    console.log(this.eventDateSeat)
    this.authService.getEventSeats(this.eventDateSeat.eventDetail._id).subscribe(
      (eventSeat:any)=>{
        console.log(eventSeat)
        this.vip = eventSeat[0].seats.vip.rows
        this.platinum = eventSeat[0].seats.platinum.rows
        this.gold = eventSeat[0].seats.gold.rows
        this.silver = eventSeat[0].seats.silver.rows
       
        this.vipSeatPrize = eventSeat[0].seats.vip.prize
        this.platinumSeatPrize = eventSeat[0].seats.platinum.prize
        this.goldSeatPrize = eventSeat[0].seats.gold.prize
        this.silverSeatPrize = eventSeat[0].seats.silver.prize
        console.log(this.vipSeatPrize,this.platinumSeatPrize,this.goldSeatPrize,this.silverSeatPrize)
      }
    )
  }

}
