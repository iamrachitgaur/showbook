import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrls: ['./booking-payment.component.css'],
  inputs:['seatPayment']
})
export class BookingPaymentComponent implements OnInit {

  seatPayment:any
  paymentForm:FormGroup
  display:number = 0

  paymentDone(){
    console.log(this.paymentForm.value)
    this.display = 1
  }

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.seatPayment)
    this.paymentForm = this.formBuilder.group({
      cardHolder:[null,[Validators.required]],
      cardNumber:[null,[Validators.required]],
      expiration:[null,[Validators.required]],
      cvc:[null,[Validators.required]]
    })
  }

}
