import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthInterceptor implements HttpInterceptor {
  private username = environment.username;
  private password = environment.password;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const authData = btoa(this.username + ':' + this.password);
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ${authData}`,
      },
    });

    return next.handle(request);
  }
}
