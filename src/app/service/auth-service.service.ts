import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient) { }

  signup(credential:any){
    return this.http.post('userApi/userSignup',credential)
  }
  
  signin(credential:any){
    return this.http.post('userApi/userSignin',credential)
  }

  getUser(){
    return this.http.get('userApi/user')
  }
  
  // getLocationByCoords(latitude,longitude){
  //   return this.http.get('http://api.weatherstack.com/current?access_key=f64dc07a8504dd2af20db27ba965bcaf&units=m&query='+latitude+','+longitude)
  // }

  getLocation(state){
    console.log(state)
    return this.http.get('areaApi/location/'+state)
  }

  getAllState(){
    return this.http.get('areaApi/location') 
  }

  getEvent(state,eventCategory){
    return this.http.get('eventApi/event/'+state+'?eventCategory='+eventCategory)
  }

  getEventSeats(eventId){
    return this.http.get('bookingApi/booking/'+eventId)
  }



}
