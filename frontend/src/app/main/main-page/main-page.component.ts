import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Router } from '@angular/router';
import { ApiService } from './../../service-api/api.service';
import { Trip } from './../../model/trip';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  trips: Array<Trip>;

  constructor(private router:Router, 
              private api: ApiService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.trips = this.fakeDb.createTrips();
    // let res = this.api.getTrips().subscribe(trips => {
    //   this.trips = trips;
    // })
  }

  getDetailTrip(trip: Trip){
    const tripJson: string = JSON.stringify(trip);
    this.router.navigate(['trip-detail'],  { queryParams: { trip: tripJson }, skipLocationChange: true} );
   }

}
