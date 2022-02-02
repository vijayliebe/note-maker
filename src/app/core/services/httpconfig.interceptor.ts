import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CommonNotificationService } from 'src/app/shared/services/common-notification/common-notification.service';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private commonNotificationService: CommonNotificationService,
    private authenticationService: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _this = this;
    const token: string = localStorage.getItem('token');

    if(!request.url.includes("assets")){
      request = request.clone({ url: "/api/v0/notes" + request.url });
    }
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    /* Start Loader */
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body && (event.body.is_error || event.body.code)) {
          if (event.body.error_type === 'AUTHENTICATION_FAILED_ERROR') {
            this.authenticationService.logout();
            return;
          }
          const data = {
            url: event.url,
            reason: event.body.error_message || event.body.message,
            status: event.status
          };
          _this.displayError(data);
          return (event);
        }
        /* Stop Loader */
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status) {
          let data = {};
          data = {
            url: error.url,
            reason: error && error.error.reason ? error.error.reason : (error.message || error.name),
            status: error.status
          };
          _this.displayError(data);
        }
        return throwError(error);
      }));
  }

  displayError(data: any) {
    // if (!environment.production) { // will enable later
      this.commonNotificationService.showSnackBar(data.reason, 'error', 2000);
    // }
  }
}
