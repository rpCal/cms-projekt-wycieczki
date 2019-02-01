import { FakeDbService } from './../../../service-fake-db/fake-db.service';
import { Rating } from 'src/app/model/rating';
import { ApiService } from './../../../service-api/api.service';
import { Trip } from './../../../model/trip';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.scss']
})
export class TripRatingComponent implements OnInit {
  rating: Rating[];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fakeDb: FakeDbService
  ) { 
    this.route
    .queryParams
    .subscribe(params => {
      const trip: Trip = JSON.parse(params['trip']);
      // api.getRating( trip.id ); //TODO 
    });
    //TO DELETE
    fakeDb.createRating();
  }

  ngOnInit() {
  }

}
