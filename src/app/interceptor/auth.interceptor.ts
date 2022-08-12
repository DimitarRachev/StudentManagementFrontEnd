import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  static accessToken = '';
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = localStorage.getItem('access_token');
    if (token != null && !authReq.url.includes('refreshToken')) {
      authReq = this.addHeader(req, 'access_token');
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('login') && error.status === 403) {
        // console.log('in 403 if');
        
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log(this.isRefreshing);
    
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = localStorage.getItem('refresh_token');
      if (token)
        return this.authService.refreshTokens1().pipe(
          switchMap((tok: any) => {
            this.isRefreshing = false;
            localStorage.setItem('access_token', tok.access_token);
            localStorage.setItem('access_expires_at', tok.access_expires_at);
            localStorage.setItem('refresh_token', tok.refresh_token);
            localStorage.setItem('refresh_expires_at', tok.refresh_expires_at);
            localStorage.setItem('authorities', tok.authorities);
            // console.log(localStorage.getItem('access_token'));
            // console.log(localStorage.getItem('access_token_expires_at'));
            // console.log(localStorage.getItem('refresh_token'));
            // console.log(localStorage.getItem('refresh_token_expires_at'));
            this.refreshTokenSubject.next(tok.refresh_token);
            return next.handle(this.addHeader(request, 'access_token'));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            return throwError(err);
          })
        );
    }
    this.isRefreshing=false;
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addHeader(request, 'refresh_token')))
    );
  }

  addHeader(request: HttpRequest<unknown>, tockenType: string) {
    return request.clone({
      setHeaders: {'Authorization': 'Bearer ' + localStorage.getItem(tockenType)}
    })
  }
}
