import { Router } from '@angular/router';
import { AuthenticationService } from './../service-authentication/authentication.service';
import { Component, OnInit, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { DataService } from './../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [DataService],
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
  
  constructor(private auth: AuthenticationService,
    public dataService: DataService,
    private router:Router) {}

  ngOnInit() {}

  slideMenu(){
    this.isMenuToggle = this.isMenuToggle ? false : true;
  }

  goToDodaj(){
    this.router.navigate(['trip-add']);
  }
  
}
