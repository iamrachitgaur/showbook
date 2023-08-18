import { Component, OnInit } from '@angular/core';
import {Emitter} from '../../emitters/emitter'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
