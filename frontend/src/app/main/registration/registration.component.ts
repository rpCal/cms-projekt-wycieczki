import { ApiService } from './../../service-api/api.service';
import { User } from './../../model/user';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private log: LoggerService,
    private router: Router,
    public dataService: DataService,
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
      const user: User = new User({
        IsAdmin: false, 
        Email: this.registrationForm.controls['email'].value, 
        Password: this.registrationForm.controls['password'].value, 
        FirstName: this.registrationForm.controls['imie'].value, 
        LastName: this.registrationForm.controls['nazwisko'].value
      }); 
      this.loading = true;
      this.api.register(user).subscribe(response => {
        this.loading = false;
        if(response.results && response.results.user){
          this.log.openSnackBar("Pomyślnie zarejestrowano");
          this.api.login(user.Email, user.Password)
          .subscribe(response => {
            if(response.results && response.results.token && response.results.user){
              this.dataService.login(response.results.token, response.results.user);
              this.log.openSnackBar("Pomyślnie zalogowano");
              this.router.navigate(['/']);
              this.loading = false;
            }
          }, error => {
            this.log.openSnackBar(error.message);
            this.loading = false;
          });
      }}, error => {
          this.log.openSnackBar(error.message);
          this.loading = false;
        });
    } else {
      this.log.openSnackBar("błąd danych")
    }
  }

  clear(){
    this.registrationForm.reset();
  }
}
