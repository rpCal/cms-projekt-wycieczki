import { Router } from '@angular/router';
import { ApiService } from './../../service-api/api.service';
import { Trip } from './../../model/trip';
import { FakeDb } from './../../mocks/fake.db.service';
import { Component, OnInit } from '@angular/core';
import { SharedTripService } from 'src/app/service-shared-trip/shared-trip.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  trips: Array<Trip>;

  constructor(private data:FakeDb, 
              private router:Router, 
              private api: ApiService,
              private sharedTrip: SharedTripService) { }

  ngOnInit() {
    this.trips = this.data.createTrips();
  }

  getDetailTrip(trip: Trip){
    this.sharedTrip.trip = trip;
    this.router.navigate(['trip-detail']);
  }

}
