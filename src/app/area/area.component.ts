import { Component, OnInit,EventEmitter } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  outputs:['myState']
})
export class AreaComponent implements OnInit {
  getState:any
  stateArray:Array<string> = []
  myState = new EventEmitter();
  constructor(private authService:AuthServiceService) { }

  getMyLocation(){
  //   if(navigator.geolocation){

  //     navigator.geolocation.getCurrentPosition((position)=>{
  //     this.authService.getLocationByCoords(position.coords.latitude,position.coords.longitude).subscribe(
  //       (state)=>{console.log(state)}
  //     )
  //   // console.log(this.getState)
  //   // this.myState.emit(this.getState)
  // })
// }
//     else{
//       console.log('not support geolocation!!')
//     } 
  }

  selectedState(state){
    console.log(state)
     this.authService.getLocation(state.state).subscribe(
       (state)=>{
         if(state){
          this.getState = state
          this.myState.emit(this.getState)
         }
         else{
          console.log('no data')
         }
       }
     )
  }

  ngOnInit(): void {
    this.authService.getAllState().subscribe(
      (states:any)=>{
        this.stateArray = states
      }
    )
  }

}
