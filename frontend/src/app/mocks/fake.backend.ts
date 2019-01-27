import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { User } from '../model/user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = new User('user@test.pl','Jan','Nowak','haslo','user');
        let admin = new User('admin@test.pl','Ryszard','Adminowski','haslo','admin');
        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                    
                if (request.body.username === user.email && request.body.password === user.password) {
                    console.log("elo");
                    let body = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token',
                        role: user.role
                    };
                    return of(new HttpResponse({ status: 200, body }));
                } else if (request.body.username === admin.email && request.body.password === admin.password) {
                    let body = {
                        email: admin.email,
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        token: 'fake-jwt-token',
                        role: admin.role
                    };
                    return of(new HttpResponse({ status: 200, body })); 
                } else {
                     return throwError({ message: 'Username or password is incorrect' } );
                }
            }

             return next.handle(request);
            
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
