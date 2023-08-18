import { Component, OnInit,EventEmitter } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css'],
  inputs:['myCategory'],
  outputs:['selectedEvent']
})
export class EventCategoryComponent implements OnInit {

  myCategory:any
  allEvent:Array<any> = []
  selectedEvent = new EventEmitter()

  constructor(private authService:AuthServiceService) { }

  selectCard(event){
    this.selectedEvent.emit(event)
  }

  ngOnInit(): void {

    this.authService.getEvent(this.myCategory.state.state,this.myCategory.category).subscribe(
      (event:Array<any>)=>{

        event.forEach((event)=>{
          this.allEvent.push(event)
        })       

      }
    )

    this.myCategory.state.nearState.forEach(
      (state)=>{
      
        this.authService.getEvent(state,this.myCategory.category).subscribe(
          (event:Array<any>)=>{
    
            event.forEach((event)=>{
              this.allEvent.push(event)
            })       
    
          }
        )
        
      }
    )

  }

}
