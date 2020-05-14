import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser;
    this.authenticationService.userObj.subscribe(res => {
        currentUser = res;
    });
    if (currentUser) {
        return true;
    } else {
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
    }
  }
  
}
