import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { Emitter } from '../../emitters/emitter'

@Component({
  selector: 'app-signup-signin',
  templateUrl: './signup-signin.component.html',
  styleUrls: ['./signup-signin.component.css'],
})
export class SignupSigninComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,private authService:AuthServiceService) { }

  params:any
  signupForm:FormGroup
  signinForm:FormGroup



  SignupSigninForm(){
   if(this.params == "signup"){
    console.log('sinup')
    this.authService.signup(this.signupForm.value).subscribe((user:any)=>{
      document.cookie = 'token='+`${user.token};SameSite=strict;Max-Age=${4*24*60*60*1000}`
      Emitter.emitter.emit(true)
      this.router.navigate(['/'])
      },(error)=>{
        Emitter.emitter.emit(false)
        console.log(error)
      })
    }
    
    
    else{
      console.log('signin')
      this.authService.signin(this.signinForm.value).subscribe((user:any)=>{
       console.log(user,user.token)
      document.cookie = 'token='+`${user.token};SameSite=strict;Max-Age=${4*24*60*60*1000}`
      Emitter.emitter.emit(true)
      this.router.navigate(['/'])
      },(error)=>{
        Emitter.emitter.emit(false)
        console.log(error)
      })
    }
  }
  ngOnInit(): void {

    this.route.url.subscribe((url)=>{
       url.forEach((url)=>{
        if(url.path == "signup"){
          console.log(url.path)
          return this.params = url.path
        }
        else{
          return this.params = "signin"
        }
      }) 
    })

    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required]],
      password:[null,[Validators.required,Validators.minLength(5)]]
    })

    this.signinForm = this.formBuilder.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required,Validators.minLength(5)]]
    })

  }




}
