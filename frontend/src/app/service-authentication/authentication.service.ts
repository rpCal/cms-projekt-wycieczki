import { User } from './../model/user';
import { ApiService } from './../service-api/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = "";

    constructor(private api: ApiService) { }

    login(username: string, password: string) {
        return this.api.login(username, password)
            .pipe(map(user => {
                 if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage.getItem('currentUser'));
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        console.log('logout');
    }

    getRole(): string{
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        if(user){
            return user.role;
        } else {
            return "brak";
        }
    }

    isLogin(): boolean{
        if(localStorage.getItem('currentUser')){
            return true;
        } else {
            return false;
        }
    }
}