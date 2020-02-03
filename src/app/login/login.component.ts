import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private isAuthenticated$: Subscription;

  private loginForm: FormGroup;
  private minLength: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.minLength = 4;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
    });
  }

  ngOnDestroy(): void {
    this.isAuthenticated$ ? this.isAuthenticated$.unsubscribe() : this.isAuthenticated$ = null;
  }

  onLogin() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    // use service to authenticate
    this.authService.authenticate(username, password);
    // subscribe to service to be notified about changes in authentication
    this.isAuthenticated$ = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // when authenticated navigate to launchpad
        this.router.navigate(['/launchpad']);
      }
    });

  }
}
