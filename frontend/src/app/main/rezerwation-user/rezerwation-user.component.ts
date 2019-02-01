import { LoggerService } from './../../service-logger/logger.service';
import { DeleteComponent } from './delete/delete.component';
import { ApiService } from './../../service-api/api.service';
import { PayComponent } from './pay/pay.component';
import { MarkComponent } from './mark/mark.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation';

@Component({
  selector: 'app-rezerwation-user',
  templateUrl: './rezerwation-user.component.html',
  styleUrls: ['./rezerwation-user.component.scss']
})
export class RezerwationUserComponent implements OnInit {
  reservations: Array<Reservation>;

  constructor(
    private fakeDb: FakeDbService,
    private dialog: MatDialog,
    private api: ApiService,
    private log: LoggerService
    ) { 
    }

  ngOnInit() {
    this.reservations = this.fakeDb.createRezerwation().filter(r => r.user.FirstName === 'Jan');
  }

  openMarkDialog(reservation: Reservation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = reservation;
    this.dialog.open(MarkComponent, dialogConfig);
  }

  openPayDialog(reservation: Reservation) {
    if(!reservation.isPayed){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = reservation;
      this.dialog.open(PayComponent, dialogConfig);
    } else {
      this.log.openSnackBar("Już zaplacone");
    }
  }

  openDeleteDialog(reservation: Reservation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = reservation;
    this.dialog.open(DeleteComponent, dialogConfig);
  }
}