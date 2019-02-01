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
    this.dataService.refreshTrips(this.api);
  }

  getDetailTrip(trip: Trip){
    const tripJson: string = JSON.stringify(trip);
    this.router.navigate(['trip-detail'],  { queryParams: { _id: trip._id}, skipLocationChange: true} );
  }

}
