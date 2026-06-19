import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, retry, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (!token) {
      return next.handle(req);
    }

    if(req.url.includes('/refresh')){
      return next.handle(req);
    }

    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              console.log(response);
              
              localStorage.setItem('accessToken', response.accessToken);
              // localStorage.setItem('refreshToken', response.refreshToken);

              const retryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });

              return next.handle(retryRequest);
            }),

            catchError((refreshError) => {
              console.log(refreshError);
              
              this.authService.logout();
              return throwError(() => refreshError);
            }),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
