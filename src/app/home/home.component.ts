import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Emitter } from '../../emitters/emitter'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  loading:boolean = true
  user:Array<any> = []
  currentState:any

  viewAllCategories:any

  events:Array<any> = []
  opera:Array<any> = []
  auction:Array<any> = []
  magic:Array<any> = []
  poetry:Array<any> = []

  operaLoader:boolean = true
  auctionLoader:boolean = true
  magicLoader:boolean = true
  poetryLoader:boolean = true

  selectedEvent:any
  selectedEventDateTime:any

  seatPayment:any

  display:number = 0
  categories:Array<any> = ['poetry','magic','theatre','storyTelling','puppetry','auction','opera']
  constructor(private authService:AuthServiceService) { }

  myState(stateObj){

    this.currentState = stateObj
         this.authService.getEvent(stateObj.state,'opera').subscribe(
          (event:any)=>{
            this.opera = event
            this.display = 1
            Emitter.display.emit(this.display)
            setTimeout(()=>{this.operaLoader = false},2000)

          }
        )

        this.authService.getEvent(stateObj.state,'auction').subscribe(
          (event:any)=>{
            this.auction = event
            this.display = 1
            Emitter.display.emit(this.display)
            setTimeout(()=>{this.auctionLoader = false},2000)

          }
        )

        this.authService.getEvent(stateObj.state,'magic').subscribe(
          (event:any)=>{
            this.magic = event
            this.display = 1
            Emitter.display.emit(this.display)
            setTimeout(()=>{this.magicLoader = false},2000)

          }
        )

        this.authService.getEvent(stateObj.state,'poetry').subscribe(
          (event:any)=>{
            this.poetry = event
            this.display = 1
            Emitter.display.emit(this.display)
            setTimeout(()=>{this.poetryLoader = false},2000)

          }
        )
    console.log(stateObj)
  }

  viewAllCategory(category:string){
    this.viewAllCategories = {state:this.currentState,category:category}
    this.display = 2
  }

  selectEventByCategory(event){
    this.selectedEvent = event
    console.log(this.selectedEvent)
    this.display = 3
    Emitter.display.emit(this.display)
    console.log(this.display)
  }

  selectEvent(event){
    this.selectedEvent = event
    console.log(this.selectedEvent)
    this.display = 3
    Emitter.display.emit(this.display)
    console.log(this.display)
  }

  eventDateSeat(eventDateArray){
    this.selectedEventDateTime = eventDateArray
    console.log('Approach',eventDateArray)
    this.display = 4
    Emitter.display.emit(this.display)
  }

  payment(seatPayment){
    this.seatPayment = seatPayment
    this.display = 5
    Emitter.display.emit(this.display)
  }

  ngOnInit(): void {

    this.authService.getUser().subscribe(
      (user:any)=>{
        this.user = user
      }
    )
    setTimeout(()=>{this.loading = false},2000)
  }

}
