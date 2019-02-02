import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Router } from '@angular/router';
import { ApiService } from './../../service-api/api.service';
import { Trip } from './../../model/trip';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  promotedTrips:Array<Trip>;
  sub;


  searchForm: FormGroup;
  searchFormSub;
  constructor(private router:Router, 
              private api: ApiService,
              private formBuilder: FormBuilder,
              public dataService: DataService,
              private fakeDb: FakeDbService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      where_AvaiableNumberOfPlaces: [0],
      where_Date: [''],
      where_DeparturePlace: [''],
    })

    this.searchFormSub =  this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(e => {
      this.updateSeachForm();
    })
    this.dataService.refreshTrips(this.api);
    this.sub = this.dataService.state$.subscribe(e => {
      this.promotedTrips = this.dataService.state.trips.filter(t => t.promote > 1);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.searchFormSub.unsubscribe();
  }

  triggerSearch(){
    this.updateSeachForm();
  }

  updateSeachForm(){
    this.api.getTrips({
      where_AvaiableNumberOfPlaces: this.searchForm.controls['where_AvaiableNumberOfPlaces'].value,
      where_DeparturePlace: this.searchForm.controls['where_DeparturePlace'].value,
      where_Date: this.searchForm.controls['where_Date'].value,
    }).toPromise().then(response => {
      this.promotedTrips = response.results.map(t => Trip.createTripFromApiTrip(t))
    })
  }

  getDetailTrip(trip: Trip){
    this.router.navigate(['trip-detail'],  { queryParams: { _id: trip._id }, skipLocationChange: true} );
   }

}
