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
  
  constructor() { }

  ngOnInit() {
  }

  slideMenu(){
    this.isMenuToggle = this.isMenuToggle ? false : true;
  }
}
