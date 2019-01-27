import { LoggerService } from './../../service-logger/logger.service';
import { Location } from '@angular/common';
import { SharedTripService } from './../../service-shared-trip/shared-trip.service';
import { Trip } from './../../model/trip';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.scss']
})
export class TripAddComponent implements OnInit {
  tripForm: FormGroup;
  trip: Trip;

  constructor(private formBuilder: FormBuilder,
              private sharedTrip: SharedTripService,
              private location: Location,
              private log: LoggerService
              ) { }

  ngOnInit() {
    this.trip = this.sharedTrip.trip;
    if(!this.trip){
      this.trip = Trip.getEmptyTrip();
    }
    this.tripForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
        name : new FormControl(this.trip.name, Validators.compose(
          [Validators.maxLength(30), Validators.required])),
        city : new FormControl(this.trip.city, Validators.compose(
          [Validators.maxLength(30), Validators.required])),
        departurePlace : new FormControl(this.trip.departurePlace, Validators.compose(
          [Validators.maxLength(30), Validators.required])),
        departureDate : new FormControl(this.trip.departureDate, Validators.required),
        arrivalDate : new FormControl(this.trip.arrivalDate, Validators.required),
        price : new FormControl(this.trip.price, Validators.compose(
          [Validators.pattern(/^\d+$|^\d+\.\d{1,2}$/), Validators.required])),
        numberOfPlaces : new FormControl(this.trip.numberOfPlaces, Validators.required),
        describe : new FormControl(this.trip.describe,  Validators.required),
        promote : new FormControl(this.trip.promote, Validators.compose(
          [Validators.max(5), Validators.min(0), Validators.required])),
        url : new FormControl(this.trip.photoUrl,Validators.compose(
          [Validators.required])),
        });
  }

  clearTrip() {
    this.trip = Trip.getEmptyTrip();
    this.tripForm.reset();
  }

  sendToServer(){
    if(this.tripForm.valid && this.tripForm.controls["departureDate"].value < this.tripForm.controls["arrivalDate"].value){
      this.log.openSnackBar("Wysyłam - Tu trzeba strzelić do api (service-api)");
    } else {
      this.validateMessage();
    }
    console.log(this.trip);
  }

  validateMessage(){
    let errorMessage = "Błąd danych: \n\n";
    if(!this.tripForm.controls["name"].valid){
      errorMessage += "Nazwa: nie pusta i nie większa niż 30 znaków\n\n";
    }
    if(!this.tripForm.controls["city"].valid){
      errorMessage += "Dokąd: nie puste i nie większe niż 30 znaków\n\n";
    }
    if(!this.tripForm.controls["departurePlace"].valid){
      errorMessage += "Skąd: nie puste i nie większe niż 30 znaków\n\n";
    }
    if(!this.tripForm.controls["departureDate"].valid){
      errorMessage += "Kiedy: nie puste\n\n";
    }
    if(!this.tripForm.controls["arrivalDate"].valid){
      errorMessage += "Powrót: nie puste\n\n";
    }
    if(this.tripForm.controls["departureDate"].valid && this.tripForm.controls["arrivalDate"].valid && 
        this.tripForm.controls["departureDate"].value >= this.tripForm.controls["arrivalDate"].value){
        errorMessage += "Daty: Kiedy nie może być po Powrót\n\n"
    }
    if(!this.tripForm.controls["price"].valid){
      errorMessage += "Cena: nie pusta i w formacie (100 , 100.2 , 100.53 )\n\n";
    }
    if(!this.tripForm.controls["numberOfPlaces"].valid){
      errorMessage += "Ile miejsc: nie puste\n\n";
    }
    if(!this.tripForm.controls["describe"].valid){
      errorMessage += "Opis: nie pusty\n\n";
    }
    if(!this.tripForm.controls["promote"].valid){
      errorMessage += "Promowanie: nie puste i w zakresie [0,5] (gdzie 0 to wyłączone)\n\n";
    }
    if(!this.tripForm.controls["url"].valid){
      errorMessage += "Url zdjęcia: nie puste i poprawny format 'http:\\\\serwerFTP.nazwa_zdjęcia.pl' \n";
    }
    this.log.openSnackBar(errorMessage);
  }

}