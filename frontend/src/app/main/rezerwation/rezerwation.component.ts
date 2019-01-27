import { LoggerService } from 'src/app/service-logger/logger.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rezerwation',
  templateUrl: './rezerwation.component.html',
  styleUrls: ['./rezerwation.component.scss']
})
export class RezerwationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RezerwationComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private log: LoggerService) { }

  ngOnInit() {
  }

  save() {
    this.log.openSnackBar("Logika backendu!!! Proponuje tutaj przekierwoać na strone z platnosciami");
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

}
