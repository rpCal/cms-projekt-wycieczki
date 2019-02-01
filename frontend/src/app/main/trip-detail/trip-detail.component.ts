import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../service-authentication/authentication.service';
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
  constructor(private location: Location,
              private dialog: MatDialog,
              private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.trip = JSON.parse(params['trip']);
      });
  }

  backToPrevious() {
      this.location.back();
  }

  modifyTrip(){
    const tripJson: string = JSON.stringify(this.trip);
    this.router.navigate(['trip-add'],  { queryParams: { trip: tripJson}, skipLocationChange: true} );
  }

  ratingTrip(){
    const tripJson: string = JSON.stringify(this.trip);
    this.router.navigate(['trip-rating'],  { queryParams: { trip: tripJson}, skipLocationChange: true} );

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(RezerwationAddComponent, dialogConfig);
  }

}
