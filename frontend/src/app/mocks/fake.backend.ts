import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { email: 'test@test.pl', firstName: 'testname', lastName: 'testsurname', password: 'haslo123',  };

        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.email && request.body.password === testUser.password) {
                    let body = {
                        email: testUser.email,
                        firstName: testUser.firstName,
                        lastName: testUser.lastName,
                        token: 'fake-jwt-token'
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
