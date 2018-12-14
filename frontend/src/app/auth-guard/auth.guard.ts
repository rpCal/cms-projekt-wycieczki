import { LoggerService } from './../service-logger/logger.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private logger: LoggerService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('currentUser')) {
      return true;
    }

    this.route.navigate(['/login'], { queryParams: { returnUrl: state.url} });
    this.logger.openSnackBar('Nie jesteś zalogowany');
    return false;
  }


}
