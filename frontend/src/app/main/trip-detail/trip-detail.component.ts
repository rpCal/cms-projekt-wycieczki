import { RezerwationComponent } from './../rezerwation/rezerwation.component';
import { SharedTripService } from './../../service-shared-trip/shared-trip.service';
import { Trip } from './../../model/trip';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: Trip;

  constructor(private sharedTrip: SharedTripService,
              private location: Location,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.trip = this.sharedTrip.trip;
    if(this.trip == null){
      this.backToPrevious();
    }
  }

  backToPrevious() {
      this.location.back();
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(RezerwationComponent, dialogConfig);
}

}
