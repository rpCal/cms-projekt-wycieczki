import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Router } from '@angular/router';
import { ApiService } from './../../service-api/api.service';
import { Trip } from './../../model/trip';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  promotedTrips;
  sub;
  constructor(private router:Router, 
              private api: ApiService,
              public dataService: DataService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.dataService.refreshTrips(this.api);
    this.sub = this.dataService.state$.subscribe(e => {
      this.promotedTrips = this.dataService.state.trips.filter(t => t.promote > 1);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getDetailTrip(trip: Trip){
    this.router.navigate(['trip-detail'],  { queryParams: { _id: trip._id }, skipLocationChange: true} );
   }

}
