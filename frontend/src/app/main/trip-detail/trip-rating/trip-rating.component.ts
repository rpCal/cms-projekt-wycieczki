import { Location } from '@angular/common';
import { FakeDbService } from './../../../service-fake-db/fake-db.service';
import { Rating } from 'src/app/model/rating';
import { ApiService } from './../../../service-api/api.service';
import { Trip } from './../../../model/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.scss']
})
export class TripRatingComponent implements OnInit {
  ratings: Rating[];
  trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fakeDb: FakeDbService,
    private location: Location,
    private router: Router
  ) { 
    this.route
    .queryParams
    .subscribe(params => {
      this.trip = JSON.parse(params['trip']);
      this.ratings = fakeDb.createRating().filter(r => r.trip._id === this.trip._id);
      // api.getRating( trip.id ); //TODO 
    });
    //TO DELETE
  }

  ngOnInit() {

  }
  
  backToPrevious() {
    this.router.navigate(['main-page']);
  }
  

}
