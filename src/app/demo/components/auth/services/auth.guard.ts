import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userValue = JSON.parse(localStorage.getItem('user_Auth'));
    if (userValue) {
      if(route.routeConfig.path=='users'){
        if(userValue.admin==true){
          return true
        }else{
          return false
        }
      }
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
