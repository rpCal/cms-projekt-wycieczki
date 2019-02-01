import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { LoggerService } from 'src/app/service-logger/logger.service';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/service-api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading: boolean = false;

    constructor(
      public dataService: DataService, 
      private log: LoggerService,
      private formBuilder: FormBuilder,
      private api: ApiService,
      private router: Router) {}

    
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: [this.dataService.state.user.Email],
      imie: [this.dataService.state.user.FirstName, Validators.required],
      nazwisko: [this.dataService.state.user.LastName, Validators.required],
      password: ['', Validators.required]
   });
  }

  sendToServer(){
    if(this.profileForm.valid){
      const user: User = new User({
        _id: this.dataService.state.user._id,
        IsAdmin: this.dataService.state.user.IsAdmin,
        Email: this.dataService.state.user.Email, 
        Password: this.profileForm.controls['password'].value, 
        FirstName: this.profileForm.controls['imie'].value, 
        LastName: this.profileForm.controls['nazwisko'].value
      }); 
      this.loading = true;
      this.api.updateProfile(user).subscribe(response => {
        this.loading = false;
        if(response.results == true){
          this.log.openSnackBar("Pomyślnie zaktualizowano profil")
          this.dataService.updateProfile(user);
        }
      }, error => {
        this.log.handleError(error);
        this.loading = false;
      });
    } else {
      this.log.openSnackBar("popraw dane w formularzu")
    }
  }
  


}

