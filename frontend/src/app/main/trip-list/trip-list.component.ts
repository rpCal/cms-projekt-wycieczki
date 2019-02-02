import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { ApiService } from './../../service-api/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  sub;
  searchForm:FormGroup;
  trips: Array<Trip> = [];

  searchFormSub;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
              public dataService: DataService,
              private api: ApiService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.dataService.refreshTrips(this.api);

    this.searchForm = this.formBuilder.group({
      where_AvaiableNumberOfPlaces: [0],
      where_Date: [''],
      where_City: [''],
      where_Name: [''],
      where_DeparturePlace: [''],
      where_Price: [''],
    })

    this.searchFormSub =  this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(e => {
      this.updateSeachForm();
    })
    this.sub = this.dataService.state$.subscribe(e => {
      this.trips = this.dataService.state.trips;
    })
  }

  getDetailTrip(trip: Trip){
    this.router.navigate(['trip-detail'],  { queryParams: { _id: trip._id}, skipLocationChange: true} );
  }



  triggerSearch(){
    this.updateSeachForm();
  }

  updateSeachForm(){
    this.api.getTrips({
      where_AvaiableNumberOfPlaces: this.searchForm.controls['where_AvaiableNumberOfPlaces'].value,
      where_City: this.searchForm.controls['where_City'].value,
      where_Date: this.searchForm.controls['where_Date'].value,
      where_Name: this.searchForm.controls['where_Name'].value,
      where_DeparturePlace: this.searchForm.controls['where_DeparturePlace'].value,
      where_Price: this.searchForm.controls['where_Price'].value,
    }).toPromise().then(response => {
      this.trips = response.results.map(t => Trip.createTripFromApiTrip(t))
    })
  }
}
