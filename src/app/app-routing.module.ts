import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardGuard } from './guard/auth-guard.guard';
import { NoauthGuardGuard } from './guard/noauth-guard.guard'

import { SignupSigninComponent } from './signup-signin/signup-signin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AreaComponent } from './area/area.component';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventSeatsComponent } from './event-seats/event-seats.component';
import { EventCategoryComponent } from './event-category/event-category.component';
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';

const routes: Routes = [
  {path:'signup',component:SignupSigninComponent,canActivate:[NoauthGuardGuard]},
  {path:'signin',component:SignupSigninComponent,canActivate:[NoauthGuardGuard]},
  {path:'',component:HomeComponent,canActivate:[AuthGuardGuard]},
  {path:'booking',component:BookingComponent,canActivate:[AuthGuardGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HeaderComponent,
  SignupSigninComponent,
  HomeComponent,AreaComponent,
  FooterComponent,
  ProfileComponent,
  BookingComponent,
  EventPageComponent,
  EventCategoryComponent,
  EventSeatsComponent,
  BookingPaymentComponent
]