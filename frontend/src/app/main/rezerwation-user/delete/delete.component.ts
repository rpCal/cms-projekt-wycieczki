import { Router } from '@angular/router';
import { ApiService } from './../../../service-api/api.service';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { Reservation } from './../../../model/reservation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteRezerwationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteRezerwationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reservation,
    private log: LoggerService,
    private api: ApiService,
    private router: Router
  ) { }
  
  ngOnInit() {
     
  }
  
  save() {
    this.api.deleteReservation(this.data._id).subscribe( r => {
      this.log.openSnackBar("Rezerwacja usunięta");
      this.router.navigate(['main-page']);
      this.dialogRef.close();
    })
    this.dialogRef.close();
  }
  
  close() {
      this.dialogRef.close();
  }
}
  
