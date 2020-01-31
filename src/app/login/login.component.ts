import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginForm: FormGroup;
  private minLength: number;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.minLength = 4;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
    });
  }

  ngOnDestroy(): void {
  }

  onLogin() {

  }
}
