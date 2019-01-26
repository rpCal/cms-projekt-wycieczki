import { SharedTripService } from './../../service-shared-trip/shared-trip.service';
import { Trip } from './../../model/trip';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: Trip;

  constructor(private sharedTrip: SharedTripService) { }

  ngOnInit() {
    this.trip = this.sharedTrip.trip;
  }

}
