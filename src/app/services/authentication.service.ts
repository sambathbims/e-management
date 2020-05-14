import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.base_url;
  
  private user = new BehaviorSubject(null);
  public userObj = this.user.asObservable();

  constructor(private http: HttpClient) {
    let user: any;
    user = JSON.parse(sessionStorage.getItem('user'));
    if(user && user.auth_token){
      this.currentUser(user);
    }
  }

  currentUser(user): any {
    this.user.next(user);
  }

  login(value): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/users/login`, value);
  }

  logOut(){
    this.currentUser(null);
    sessionStorage.removeItem('user');
  }
}
