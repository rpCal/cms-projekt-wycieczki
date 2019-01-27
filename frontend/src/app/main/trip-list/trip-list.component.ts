import { Router } from '@angular/router';
import { SharedTripService } from './../../service-shared-trip/shared-trip.service';
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

  constructor(private sharedTrip: SharedTripService, 
              private data:FakeDb,
              private router: Router) { }

  ngOnInit() {
    this.trips = this.data.createDb();
  }

  getDetailTrip(trip: Trip){
    this.sharedTrip.trip = trip;
    this.router.navigate(['trip-detail']);
  }

}
