import { User } from './../model/user';
import { ApiService } from './../service-api/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private api: ApiService) { }

    login(username: string, password: string) {
        return this.api.login(username, password)
            .pipe(map(user => {
                if (user && user.token) {
                
                }
                return user;
            }));
    }

    logout() {
    }

}