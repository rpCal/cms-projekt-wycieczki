import { AuthenticationService } from './../service-authentication/authentication.service';
import { LoggerService } from './../service-logger/logger.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private logger: LoggerService, private auth: AuthenticationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('currentUser')) {
      const expectedRole = next.data.expectedRole;
      if(expectedRole){
        if(expectedRole == "admin"){
          if(this.auth.getRole() == "admin"){
            return true;
          } else {
            return false;
          }
        }
        if(expectedRole == "user"){
          if(this.auth.getRole() == "user"){
            return true;
          } else {
            return false;
          }
        }
      }
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
    this.logger.openSnackBar('Nie jesteś zalogowany');
    return false;
  }


}
