import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(public snackBar: MatSnackBar,
              private zone: NgZone) { }

  public openSnackBar(message, action = 'success', duration = 50000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, {
        duration: duration,
        panelClass: ['snackbar-thema']
      });
    })
  }
}
