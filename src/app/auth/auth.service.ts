import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../notification/notification.service';
import {ApplicationResponse} from '../model/application-response.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _TOKEN: string;

  // tslint:disable-next-line:variable-name
  private _isAuthenticated$: Subject<boolean> = new Subject();
  // tslint:disable-next-line:variable-name
  private _isLoggedIn$: Subject<boolean> = new Subject();
  // tslint:disable-next-line:variable-name
  private _isAuthenticated: boolean;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

  authenticate(username: string, password: string) {
    // save the base64 encoded string
    this.encodeValues(username, password);
    const url = `${environment.basePath}${environment.userLoginUrl}`;
    this.httpClient.post<ApplicationResponse>(`${url}`, {username, password})
      .subscribe(this.handleResponse(), this.handleError());
  }

  private encodeValues(username: string, password: string) {
    const hashedUsernamePassword = btoa(`${username}:${password}`);
    this._TOKEN = `Basic ${hashedUsernamePassword}`;
  }


  private handleResponse() {
    return response => {
      if (response.status === 'OK') {
        this._isAuthenticated = true;
        this.isLoggedIn$.next(true);
        this.isAuthenticated$.next(true);
      } else {
        this.isLoggedIn$.next(false);
        this.isAuthenticated$.next(false);
      }
      this.notificationService.createSnackBar(response.message, 'Dismiss', 2000);
    };
  }

  private handleError() {
    return error => {
      // its either an errorEvent (client side error) or an error response (server error)
      const message = error.error.message;
      console.error(`some error occurred: `, message);
      this._isAuthenticated = true;
      this.isLoggedIn$.next(false);
      this.isAuthenticated$.next(false);
      this.notificationService.createSnackBar(message, 'Dismiss', 2000);
    };
  }

  get isAuthenticated$(): Subject<boolean> {
    return this._isAuthenticated$;
  }


  set isAuthenticated$(value: Subject<boolean>) {
    this._isAuthenticated$ = value;
  }

  get TOKEN(): string {
    return this._TOKEN;
  }

  get isLoggedIn$(): Subject<boolean> {
    return this._isLoggedIn$;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  ngOnDestroy(): void {
    this.isAuthenticated$ ? this.isAuthenticated$.unsubscribe() : this.isAuthenticated$ = null;
  }

  logout(): Observable<boolean> {
    this.isLoggedIn$.next(false);
    this.isAuthenticated$.next(false);
    return new Observable(observer => observer.next(true));
  }
}
