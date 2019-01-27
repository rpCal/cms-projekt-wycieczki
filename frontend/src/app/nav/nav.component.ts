import { Router } from '@angular/router';
import { SharedTripService } from 'src/app/service-shared-trip/shared-trip.service';
import { AuthenticationService } from './../service-authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('menuToggle', [
      state('slideLeft', style({
        right: '-260px',
      })),
      state('slideRight', style({
        right: '0px',
      })),  
      
      transition('slideRight => slideLeft', [
        animate('0.5s')
      ]), 
      transition('slideLeft => slideRight', [
        animate('0.5s')      
      ]),
    ])
  ]
})

export class NavComponent implements OnInit {
  isMenuToggle: boolean = false;
  role: string = "";
  
  constructor(private auth: AuthenticationService, private sharedTrip: SharedTripService, private router:Router) { }

  ngOnInit() {
    this.role = this.auth.getRole();
  }

  slideMenu(){
    this.isMenuToggle = this.isMenuToggle ? false : true;
  }

  goToDodaj(){
    this.sharedTrip.trip = null;
    this.router.navigate(['trip-add']);
  }
  
}
