import { Component, OnInit } from '@angular/core';
import { Emitter } from '../../emitters/emitter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  emitDisplay:number = 0
  constructor() { }

  ngOnInit(): void {
    
    Emitter.display.subscribe(
      (display)=>{
        this.emitDisplay = display
      }
    )
  }

}
