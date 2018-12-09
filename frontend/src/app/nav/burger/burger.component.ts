import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  animations: [
    trigger('burger', [
      state('noramal', style({
        top: '0px',
      })),
      state('hide', style({
        visibility: 'hidden'
      })),
      state('rotateLeft', style({
        top: '20px',
        transform: 'rotate(45deg)'
      })),
      state('rotateRight', style({
        top: '-20px',
        transform: 'rotate(-45deg)'
      })),
      
      transition('normal => rotateLeft', [
        animate('0.2s', style({
          top: '20px'
        })),
        animate('0.2s', style({
          transform: 'rotate(45deg)'
        })),
      ]), 
      transition('rotateLeft => normal', [
        animate('0.2s', style({
          transform: 'rotate(0deg)'
        })),
        animate('0.2s', style({
          top: '0px'
        })),
      ]),

      transition('normal => rotateRight', [
        animate('0.2s', style({
          top: '-20px'
        })),
        animate('0.2s', style({
          transform: 'rotate(-45deg)'
        })),
      ]), 
      transition('rotateRight => normal', [
        animate('0.2s', style({
          transform: 'rotate(0deg)'
        })),
        animate('0.2s', style({
          top: '0px'
        })),
      ]),

      transition('normal => hide', [
        animate('0.2s', style({
          visibility: 'visible'
        })),
        animate('0s', style({
          visibility: 'hidden'
        })),
      ]), 
      transition('hide => normal', [
        animate('0.2s', style({
          visibility: 'hidden'
        })),
      ]),
    ])
  ]
})

export class BurgerComponent implements OnInit {
  isMenuToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  burgerTransform(){
    this.isMenuToggle = this.isMenuToggle ? false : true;
  }

}
