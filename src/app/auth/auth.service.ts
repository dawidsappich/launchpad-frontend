import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  // tslint:disable-next-line:variable-name
  private _isAuthenticated$: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) {
    this.httpClient.get('/api/v1/login')
      .subscribe(this.handleResponse(), this.handleError());
  }


  private handleResponse() {
    return response => {
      console.log(response);
      this.isAuthenticated$.next(true);
    };
  }

  private handleError() {
    return error => {
      console.log(error);
      this.isAuthenticated$.next(false);
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
