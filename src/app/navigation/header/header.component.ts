import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {NotificationService} from '../../notification/notification.service';
import {Router} from '@angular/router';
import {faRocket} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private rocketIcon = faRocket;

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) { }

  get isAuthenticated(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn$;
  }

  onLogout() {
    this.authService.logout()
      .subscribe(isLoggedOut => {
        this.notificationService.createSnackBar('logout successful', 'Dismiss', 2000);
        this.router.navigate(['/login']);
      });
  }
}
