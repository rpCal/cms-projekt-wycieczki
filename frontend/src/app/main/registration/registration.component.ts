import { ApiService } from './../../service-api/api.service';
import { User } from './../../model/user';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private log: LoggerService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      password: ['', Validators.required]
   });
  }

  sendToServer(){
    if(this.registrationForm.valid){
      const user: User = new User(null, this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value, this.registrationForm.controls['imie'].value, this.registrationForm.controls['nazwisko'].value); 
      // api do rejestracji TODO
      this.log.openSnackBar("TU INTEGRACJA Z API");
    } else {
      this.log.openSnackBar("błąd danych")
    }
  }

  clear(){
    this.registrationForm.reset();
  }
}
