import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../service-authentication/authentication.service';
import { LoggerService } from 'src/app/service-logger/logger.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    isLogin: boolean = false;
    returnUrl: string;
    constructor(
        private formBuilder: FormBuilder,
        private log: LoggerService,
        private route: ActivatedRoute,
        private router: Router,
        public dataService: DataService,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;    
        this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
            .subscribe(
              response => {
                this.loading = false;
                if(response.results && response.results.token && response.results.user){
                    this.dataService.login(response.results.token, response.results.user);
                    this.log.openSnackBar("Pomyślnie zalogowano");
                    this.router.navigate(['/'])
                }
            },
              error => {
                this.log.openSnackBar(error.message);
                this.loading = false;
              });
    }
}