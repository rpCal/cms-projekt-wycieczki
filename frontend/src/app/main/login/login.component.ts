import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../service-authentication/authentication.service';
import { LoggerService } from 'src/app/service-logger/logger.service';

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
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.isLogin = this.authenticationService.isLogin();
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;    
        this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
            .subscribe(
              data => {
                window.location.reload();
                this.loading = false;
                this.router.navigate([this.returnUrl]);
            },
              error => {
                this.log.openSnackBar(error.message);
                this.loading = false;
              });
               
    }

    logout(){
        this.authenticationService.logout();
        window.location.reload();
    }
}