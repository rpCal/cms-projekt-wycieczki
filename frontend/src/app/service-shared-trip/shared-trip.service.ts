import { Trip } from 'src/app/model/trip';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedTripService {
  trip: Trip;

  constructor() { }

  get _trip(): Trip {
    return this._trip;
  }
  set _trip(trip:Trip) {
      this.trip = trip;
  }
}
