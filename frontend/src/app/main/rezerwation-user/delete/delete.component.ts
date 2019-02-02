import { Router } from '@angular/router';
import { ApiService } from './../../../service-api/api.service';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { Reservation } from './../../../model/reservation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/data.service';

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
    public dataService: DataService,
    private api: ApiService,
    private router: Router
  ) { }
  
  ngOnInit() {
     
  }
  
  save() {
    this.api.deleteReservation(this.data._id).subscribe(res => {
      this.log.openSnackBar("Rezerwacja usunięta");
      this.dataService.refreshRezerwations(this.api);
      this.dialogRef.close();
    }, error => this.log.handleError(error));
    this.dialogRef.close();
  }
  
  close() {
      this.dialogRef.close();
  }
}
  
