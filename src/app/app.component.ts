import { Component,OnInit } from '@angular/core';
import { Emitter } from '../emitters/emitter'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'showbook';
  authenticated:boolean = false
  emitDisplay:number


  ngOnInit(): void {

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    if(getCookie('token') != undefined){
      this.authenticated = true
    }
    else{
      this.authenticated = false
    }


    Emitter.emitter.subscribe(
      (auth)=>{
        this.authenticated = auth
        console.log(this.authenticated)
      }
    )

  }

}
