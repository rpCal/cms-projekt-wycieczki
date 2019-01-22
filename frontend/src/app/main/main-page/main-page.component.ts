import { ApiService } from './../../service-api/api.service';
import { Trip } from './../../model/trip';
import { FakeDb } from './../../mocks/fake.db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  trips: Array<Trip>;

  constructor(private data:FakeDb, private api: ApiService) { }

  ngOnInit() {
    this.trips = this.data.createDb();
    // this.trips.forEach(t => {
    //   this.api.addTrip(t).subscribe( tr => {
    //     console.log(tr);
    //   });
    // })
  }
}
