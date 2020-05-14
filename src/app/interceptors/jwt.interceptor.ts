import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { NotifyService } from '../services/notify.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public notifyConfig: any = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  constructor( private router: Router, private authenticationService:  AuthenticationService, private notiService: NotificationsService, private notifyService: NotifyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let currentUser;
    this.authenticationService.userObj.subscribe(res => {
        currentUser = res;
    });
    if (currentUser) {
      request = request.clone({
          setHeaders: {
              'Authorization': `Bearer ${currentUser.auth_token}`
          }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showWarn('Error', error.error.message);
        if (error.status == 401) {
          this.authenticationService.logOut();
            this.router.navigate(["/login"]);
        }
        return throwError(
            new HttpErrorResponse({
              error: error.error,
              headers: error.headers,
              status: error.status,
              statusText: error.statusText,
              url: error.url || undefined
            })
          );
      })
    );
  }
}
