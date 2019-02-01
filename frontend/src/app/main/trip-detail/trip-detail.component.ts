import { Router } from '@angular/router';
import { AuthenticationService } from './../../service-authentication/authentication.service';
import { SharedTripService } from './../../service-shared-trip/shared-trip.service';
import { Trip } from './../../model/trip';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RezerwationAddComponent } from './rezerwation-add/rezerwation-add.component';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: Trip;
  isAdmin: boolean = false;
  isUser: boolean = false;
  
  constructor(private sharedTrip: SharedTripService,
              private location: Location,
              private dialog: MatDialog,
              private auth: AuthenticationService,
              private router: Router ) { }

  ngOnInit() {
    this.trip = this.sharedTrip.trip;
    if(this.trip == null){
      this.backToPrevious();
    }
  }

  backToPrevious() {
      this.location.back();
  }

  modifyTrip(){
    this.sharedTrip.trip = this.trip;
    this.router.navigate(['trip-add']);
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(RezerwationAddComponent, dialogConfig);
  }

}
