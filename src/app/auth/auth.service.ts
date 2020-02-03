import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
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
        this.isAuthenticated$.next(true);
      } else {
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

  ngOnDestroy(): void {
    this.isAuthenticated$ ? this.isAuthenticated$.unsubscribe() : this.isAuthenticated$ = null;
  }
}
