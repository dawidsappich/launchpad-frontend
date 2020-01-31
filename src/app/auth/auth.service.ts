import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../notification/notification.service';
import {ApplicationResponse} from '../model/application-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  // tslint:disable-next-line:variable-name
  private _isAuthenticated$: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

  authenticate(username: string, password: string) {
    this.httpClient.get<ApplicationResponse>('/api/v1/login')
      .subscribe(this.handleResponse(), this.handleError());
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
      console.log(error);
      this.isAuthenticated$.next(false);
      this.notificationService.createSnackBar('Authentication failed!', 'Dismiss', 2000);
    };
  }

  get isAuthenticated$(): Subject<boolean> {
    return this._isAuthenticated$;
  }


  set isAuthenticated$(value: Subject<boolean>) {
    this._isAuthenticated$ = value;
  }

  ngOnDestroy(): void {
    this.isAuthenticated$ ? this.isAuthenticated$.unsubscribe() : this.isAuthenticated$ = null;
  }
}
