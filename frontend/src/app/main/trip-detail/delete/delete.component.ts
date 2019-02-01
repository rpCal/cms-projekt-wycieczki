import { Router } from '@angular/router';
import { ApiService } from 'src/app/service-api/api.service';
import { LoggerService } from './../../../service-logger/logger.service';
import { Reservation } from 'src/app/model/reservation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteTripComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteTripComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reservation,
    private log: LoggerService,
    private api: ApiService,
    private router: Router
  ) { }
  
  ngOnInit() {
     
  }
  
  save() {
    this.api.delTrip(this.data).subscribe( t => {
      this.log.openSnackBar("Trip usunięty");
      this.router.navigate(['main-page']);
      this.dialogRef.close();
    });
    
  }
  
  close() {
      this.dialogRef.close();
  }
}
  