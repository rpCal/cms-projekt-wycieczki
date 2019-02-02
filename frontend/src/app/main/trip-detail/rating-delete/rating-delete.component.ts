import { Router } from '@angular/router';
import { ApiService } from 'src/app/service-api/api.service';
import { LoggerService } from '../../../service-logger/logger.service';
import { Reservation } from 'src/app/model/reservation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Rating } from 'src/app/model/rating';

@Component({
  selector: 'app-rating-delete',
  templateUrl: './rating-delete.component.html',
  styleUrls: ['./rating-delete.component.scss']
})
export class RatingDeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RatingDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Rating,
    private log: LoggerService,
    private api: ApiService,
    private router: Router
  ) { }
  

  ngOnInit() {
     
  }
  
  save() {
    this.api.deleteRating(this.data._id).subscribe( t => {
      this.log.openSnackBar("Rating usunięty");
      this.dialogRef.close(true);
    });
    
  }
  
  close() {
      this.dialogRef.close(false);
  }
}
  