import { LoggerService } from 'src/app/service-logger/logger.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { ApiService } from 'src/app/service-api/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rezerwation-add',
  templateUrl: './rezerwation-add.component.html',
  styleUrls: ['./rezerwation-add.component.scss']
})
export class RezerwationAddComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RezerwationAddComponent>,
    public dataService: DataService,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) data,
    private log: LoggerService) { }

  ngOnInit() {
    console.log('co jest?', this.dataService.state.selectedTrip)
    this.form = this.formBuilder.group({
      numberOfPeople: [0, Validators.compose(
        [
          Validators.max(this.dataService.state.selectedTrip.availableNumberOfPlaces), 
          Validators.min(1),
          Validators.required
        ])],
   });
  }

  save() {
    if (this.form.invalid) {
      this.log.openSnackBar("Popraw formularz")
      return;
    }
    console.log('udalo sie', this.form);
    // this.api.postReservation()
    this.dialogRef.close();
    this.dataService.setState({ 
      ...this.dataService.state,
      selectedTrip: null
    });
  }

  close() {
    this.dialogRef.close();
    this.dataService.setState({ 
      ...this.dataService.state,
      selectedTrip: null
    });
  }

}
