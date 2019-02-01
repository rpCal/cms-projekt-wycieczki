import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(public snackBar: MatSnackBar,
              private zone: NgZone) { }

  public openSnackBar(message, action = 'Zamknij', duration = 50000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, {
        duration: duration,
        panelClass: ['snackbar-thema']
      });
    })
  }
  public handleError(error){
    if(error && error.error && error.error.message){
      if(error.error.message == "JWT AUTH problem"){
        this.openSnackBar("Twoja sesja wygasła. Prosimy abyś zalogował się ponownie.");
        return
      }
      this.openSnackBar(error.error.message);
    }else{
      this.openSnackBar(error.message);
    }
  }
}
