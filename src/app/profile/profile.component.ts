import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userObject:any = {}

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user:any)=>{
        this.userObject = user.user
        console.log(this.userObject)
      }
    )
  }

}
