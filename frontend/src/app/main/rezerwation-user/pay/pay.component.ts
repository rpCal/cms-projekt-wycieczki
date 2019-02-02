import { ApiService } from './../../../service-api/api.service';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { Reservation } from './../../../model/reservation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PayComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reservation,
    private log: LoggerService,
    public dataService: DataService,
    private api: ApiService
    ) { }

  ngOnInit() {
    
  }

  save() {
    this.api.postPayReservation(this.data._id).subscribe(res => {
      this.log.openSnackBar("Gratulacje rezerwacja została opłacona");
      this.dataService.refreshRezerwations(this.api);
      this.dialogRef.close();
    }, error => this.log.handleError(error));
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

}
