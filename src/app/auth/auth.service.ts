import { Injectable } from '@angular/core';
import { LoginForm } from '../model/LoginForm';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = 'http://localhost:8008/login';
  private refreshUrl: string = 'http://localhost:8008/refreshToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(form: LoginForm): void {
    const responce = this.http.post<any>(this.loginUrl, form);
    responce.subscribe(r => {

      localStorage.setItem('access_token', r.access_token);
      localStorage.setItem('access_expires_at', r.access_expires_at);
      localStorage.setItem('refresh_token', r.refresh_token);
      localStorage.setItem('refresh_expires_at', r.refresh_expires_at);
      //   For Debugging
      // console.log(localStorage.getItem('access_token'));
      // console.log(localStorage.getItem('access_expires_at'));
      // console.log(localStorage.getItem('refresh_token'));
      // console.log(localStorage.getItem('refresh_expires_at'));
    });
    // ,
    // (error: HttpErrorResponse) => {
    // alert(error.error);
    // });
  }

  getHeader(): HttpHeaders {

    if (!this.isLoggedIn()) {
      this.refreshTokens();
    }

    return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  }

  refreshTokens(): void {
    if (!this.isRefreshValid()) {
      this.router.navigate(['login']);
    }
    const refreshHeader = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('refresh_token'));



    this.http.get<any>(this.refreshUrl, { headers: refreshHeader })
      .subscribe(r => {

        localStorage.setItem('access_token', r.access_token);
        localStorage.setItem('access_expires_at', r.access_expires_at);
        localStorage.setItem('refresh_token', r.refresh_token);
        localStorage.setItem('refresh_expires_at', r.refresh_expires_at);
        //   For Debugging
        // console.log(localStorage.getItem('access_token'));
        // console.log(localStorage.getItem('access_expires_at'));
        // console.log(localStorage.getItem('refresh_token'));
        // console.log(localStorage.getItem('refresh_expires_at'));
      });

  }


  isRefreshValid(): boolean {
    const expiration = localStorage.getItem("refresh_expires_at");
    if (expiration) {
      const expiresAt: Date = JSON.parse(expiration);
      return moment().isBefore(moment(expiresAt));
    } else {
      return false;
    }
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

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_expires_at");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refresh_expires_at");
  }
}
