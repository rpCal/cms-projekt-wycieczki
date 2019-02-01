import { ApiService } from './../../../service-api/api.service';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { Reservation } from './../../../model/reservation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

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
    private api: ApiService
    ) { }

  ngOnInit() {
    
  }

  save() {
    this.log.openSnackBar("TU INTEGRACJA Z API");
    // this.api.postPayReservation() TODO
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

}
