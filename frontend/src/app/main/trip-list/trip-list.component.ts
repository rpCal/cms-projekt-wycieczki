import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { ApiService } from './../../service-api/api.service';
import { Router } from '@angular/router';
import { SharedTripService } from './../../service-shared-trip/shared-trip.service';
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
              private router: Router,
              private api: ApiService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.trips = this.fakeDb.createTrips();
    // let res = this.api.getTrips().subscribe(trips => {
    //   this.trips = trips;
    // })
  }

  getDetailTrip(trip: Trip){
    this.sharedTrip.trip = trip;
    this.router.navigate(['trip-detail']);
  }

}
