import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { ApiService } from './../../service-api/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(private router: Router,
              public dataService: DataService,
              private api: ApiService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.api.getTrips().subscribe(response => {
      this.dataService.setState({ 
        ...this.dataService.state,
        trips: response.results.map(t => Trip.createTripFromApiTrip(t))
      });
    });
  }

  getDetailTrip(trip: Trip){
    console.log('co wybralem?', trip)
    this.dataService.setState({ 
      ...this.dataService.state,
      selectedTrip: trip
    });
    // const tripJson: string = JSON.stringify(trip);
    // this.router.navigate(['trip-detail'],  { queryParams: { trip: tripJson}, skipLocationChange: true} );
  }

}
