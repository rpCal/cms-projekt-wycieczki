import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../service-authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;    
        this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
            .subscribe(
              data => {
                this.loading = false;
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error.message;
                ;
                this.loading = false;
              });
               
    }

    logout(){
        this.authenticationService.logout();
    }
}