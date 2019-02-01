import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Router } from '@angular/router';
import { ApiService } from './../../service-api/api.service';
import { Trip } from './../../model/trip';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  // trips: Array<Trip>;

  constructor(private router:Router, 
              private api: ApiService,
              public dataService: DataService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.api.getTrips().subscribe(response => {
      this.dataService.setState({ 
        ...this.dataService.state,
        trips: response.results.map(e => Trip.createTripFromApiTrip(e))
      });
    });

    // this.trips = new Array<Trip>();
    // this.api.getTrips().subscribe(trips => {
    //   trips.results.forEach(t => {
    //     if(t.Promote > 0){
    //       this.trips.push(Trip.createTripFromApiTrip(t));
    //     }
    //   });
    // });

    // this.trips = this.dataService.state.trips;
    // this.api.getTrips().subscribe(trips => {
    //   trips.results.forEach(t => {
    //     if(t.Promote > 1){
    //       this.trips.push(Trip.createTripFromApiTrip(t));
    //     }
    //   });
    // })
  }

  getDetailTrip(trip: Trip){
    const tripJson: string = JSON.stringify(trip);
    this.router.navigate(['trip-detail'],  { queryParams: { trip: tripJson }, skipLocationChange: true} );
   }

}
