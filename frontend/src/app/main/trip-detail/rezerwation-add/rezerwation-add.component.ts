import { LoggerService } from 'src/app/service-logger/logger.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { ApiService } from 'src/app/service-api/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Reservation } from 'src/app/model/reservation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Trip } from 'src/app/model/trip';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rezerwation-add',
  templateUrl: './rezerwation-add.component.html',
  styleUrls: ['./rezerwation-add.component.scss']
})
export class RezerwationAddComponent implements OnInit, OnDestroy {
  form: FormGroup
  trip: Trip;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RezerwationAddComponent>,
    public dataService: DataService,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) data,
    private router: Router,
    private log: LoggerService) { 

      this.sub = this.route.queryParams
        .subscribe(params => {
          this.trip = this.dataService.getTripById(params['_id']);
        });
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      numberOfPeople: [0, Validators.compose(
        [
          Validators.max(this.trip.availableNumberOfPlaces), 
          Validators.min(0),
          Validators.required
        ])],
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  save() {
    if (this.form.invalid) {
      this.log.openSnackBar("Popraw formularz")
      return;
    }
    
    let newRezervation = new Reservation(null, false, 
      this.form.controls['numberOfPeople'].value, 
      this.trip, 
      this.dataService.state.user);

    this.api.postReservation(newRezervation)
      .subscribe(res => {
        if(res.results && res.results.rezerwation && res.results.trip){
          let newValue = this.trip.availableNumberOfPlaces - newRezervation.numberOfPlaces;
          this.dataService.updateFieldOnTrips(this.trip._id, "availableNumberOfPlaces", newValue)
          this.dialogRef.close();
          this.log.openSnackBar("Rezerwacja zakończona. Prosimy o opłacenie zamówienia");
        }
      }, error => this.log.handleError(error))
  }


  close() {
    this.dialogRef.close(false);
  }
}
