import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../model/reservation';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss']
})
export class UserReservationComponent implements OnInit {
  rezerwations: Array<Reservation>
  constructor() { }

  ngOnInit() {

    
  }

}
