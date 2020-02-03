import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  // add authorization header to the request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = req.headers.set('Authorisation', this.authService.TOKEN);
    const httpRequest = req.clone({headers});
    // if url is user login handle the original req without adding the authorization header
    return req.url.endsWith(environment.userLoginUrl) ? next.handle(req) : next.handle(httpRequest);
  }

}
