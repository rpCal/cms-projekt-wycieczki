import { ApiService } from './../service-api/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = "";
    isLogin: boolean;

    constructor(private api: ApiService) { }

    login(username: string, password: string) {
        return this.api.login(username, password)
            .pipe(map(user => {
                 if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage.getItem('currentUser'));
                    this.isLogin = true;
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.isLogin = false;
        console.log('logout');
    }
}