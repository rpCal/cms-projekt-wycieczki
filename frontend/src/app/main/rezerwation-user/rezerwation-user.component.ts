import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation';

@Component({
  selector: 'app-rezerwation-user',
  templateUrl: './rezerwation-user.component.html',
  styleUrls: ['./rezerwation-user.component.scss']
})
export class RezerwationUserComponent implements OnInit {
  reservations: Array<Reservation>;

  constructor(
    private fakeDb: FakeDbService) { 
    }

  ngOnInit() {
    this.reservations = this.fakeDb.createRezerwation();
  }

}
