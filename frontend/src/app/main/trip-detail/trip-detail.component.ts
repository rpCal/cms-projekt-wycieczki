import { ApiService } from './../../service-api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../service-authentication/authentication.service';
import { Trip } from './../../model/trip';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RezerwationAddComponent } from './rezerwation-add/rezerwation-add.component';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { DataService } from 'src/app/data.service';
import { DeleteTripComponent } from './delete/delete.component';
import { Rating } from 'src/app/model/rating';
import { RatingDeleteComponent} from './rating-delete/rating-delete.component'

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit, OnDestroy {
  trip: Trip;
  ratings: Array<Rating> = [];
  loadingRatings: boolean = false;
  sub;
  ratingsSub;
  constructor(private location: Location,
              private dialog: MatDialog,
              public dataService: DataService,
              private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute, 
              private log: LoggerService,
              private api: ApiService) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.trip = this.dataService.getTripById(params['_id']);
      });

    this.loadingRatings = true;
    this.ratingsSub = this.api.getRating(this.trip._id).subscribe(res => {
      this.ratings = res.results.map(e => Rating.createFromApi(e))
      this.loadingRatings = false;
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
    this.ratingsSub.unsubscribe();
  }

  backToPrevious() {
    this.router.navigate(['main-page']);
  }


  deleteTrip(){
    this.api.delTrip(this.trip).subscribe(t => {
      this.log.openSnackBar("Trip usunięty");
      this.router.navigate(['main-page']);
    });
  }

  modifyTrip(){
    const tripJson: string = JSON.stringify(this.trip);
    this.router.navigate(['trip-add'],  { queryParams: { trip: tripJson, _id: this.trip._id}, skipLocationChange: true} );
  }

  ratingTrip(){
    const tripJson: string = JSON.stringify(this.trip);
    this.router.navigate(['trip-rating'],  { queryParams: { trip: tripJson, _id: this.trip._id}, skipLocationChange: true} );

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(RezerwationAddComponent, dialogConfig);
  }

  openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.trip;
    this.dialog.open(DeleteTripComponent, dialogConfig);
  }


  openDeleteRatingDialog(rating: Rating){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = rating;
    this.dialog.open(RatingDeleteComponent, dialogConfig).afterClosed()
    .subscribe(result=> {
      if(result){
        this.loadingRatings = true;
        this.ratingsSub = this.api.getRating(this.trip._id).subscribe(res => {
          this.ratings = res.results.map(e => Rating.createFromApi(e))
          this.loadingRatings = false;
        });
      }
    })
  }
}
