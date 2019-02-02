import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../service-api/api.service';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { Reservation } from './../../../model/reservation';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Rating } from 'src/app/model/rating';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
  ratingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MarkComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reservation,
    private log: LoggerService,
    public dataService: DataService,
    private api: ApiService
    ) { }

  ngOnInit() {
    this.ratingForm = this.formBuilder.group({
      rateMark: [5, Validators.compose(
        [Validators.max(5), Validators.min(0), Validators.required])],
      comment: ['Myśle ze ta wycieczka była: ', Validators.required]
    });
  }

  save() {
    if(this.ratingForm.valid){
      const rating: Rating = new Rating(null,  this.ratingForm.controls["comment"].value, 
                        this.ratingForm.controls["rateMark"].value,
                        this.data.trip, this.data.user);
      this.api.postRating(rating).subscribe(res => {
        this.log.openSnackBar("Dziękujemy za Twoją opinie");
        this.dataService.refreshRezerwations(this.api);
        this.dialogRef.close();
      }, error => this.log.handleError(error));
      this.dialogRef.close();
    } else {
      this.log.openSnackBar("Formularz nie poprawny");
    }

  }

  close() {
      this.dialogRef.close();
  }

}
