import { FakeDb } from './../../mocks/fake.db.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips: Array<Trip>;

  constructor(private data:FakeDb) { }

  ngOnInit() {
    this.trips = this.data.createDb();
    console.log(this.trips);
  }
}
