import { LoggerService } from './../../service-logger/logger.service';
import { ApiService } from './../../service-api/api.service';
import { PayComponent } from './pay/pay.component';
import { MarkComponent } from './mark/mark.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FakeDbService } from './../../service-fake-db/fake-db.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation';
import { DeleteRezerwationComponent } from './delete/delete.component';
import { DataService } from 'src/app/data.service';

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
    public dataService: DataService,
    private log: LoggerService
    ) { 
    }

  ngOnInit() {
    this.dataService.refreshRezerwations(this.api);
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
      this.log.openSnackBar("Rezerwacja została opłacona.");
    }
  }

  openDeleteDialog(reservation: Reservation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = reservation;
    this.dialog.open(DeleteRezerwationComponent, dialogConfig);
  }
}
