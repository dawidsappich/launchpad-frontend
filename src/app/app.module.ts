import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoginComponent} from './login/login.component';
import {MaterialStyleModule} from './material-style/material-style.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialStyleModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
