import { Injectable } from '@angular/core';
import { LoginForm } from '../model/LoginForm';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = 'http://localhost:8008/login';
  private registerUrl: string = 'http://localhost:8008/register';
  private refreshUrl: string = 'http://localhost:8008/refreshToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(form: LoginForm): void {
    const responce = this.http.post<any>(this.loginUrl, form);
    responce.subscribe(r => {

      localStorage.setItem('access_token', r.access_token);
      localStorage.setItem('access_expires_at', r.access_expires_at);
      localStorage.setItem('refresh_token', r.refresh_token);
      localStorage.setItem('refresh_expires_at', r.refresh_expires_at);
      localStorage.setItem('authorities', r.authorities);


      //   For Debugging
      // console.log(localStorage.getItem('access_token'));
      // console.log(localStorage.getItem('access_expires_at'));
      // console.log(localStorage.getItem('refresh_token'));
      // console.log(localStorage.getItem('refresh_expires_at'));
      // console.log(  localStorage.getItem('authorities'));
    });
  }


  refreshTokens1(): Observable<any> {
    const refreshHeader = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('refresh_token'));

    return this.http.get(this.refreshUrl, { headers: refreshHeader });
  }

  isLoggedIn(): boolean {
    const expiration = localStorage.getItem("access_expires_at");
    if (expiration) {
      const expiresAt: Date = JSON.parse(expiration);
      return moment().isBefore(moment(expiresAt));
    } else {
      return false;
    }
  }

  register(form: LoginForm) {
    this.http.post(this.registerUrl, form).subscribe();
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_expires_at");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refresh_expires_at");
  }
}
