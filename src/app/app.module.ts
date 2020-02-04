import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoginComponent} from './login/login.component';
import {MaterialStyleModule} from './material-style/material-style.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {HeaderComponent} from './navigation/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LaunchpadComponent} from './launchpad/launchpad.component';
import {BasicAuthInterceptor} from './shared/auth.interceptor';
import {AuthGuard} from './auth/auth-guard.service';
import {TileComponent} from './tile/tile.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LaunchpadComponent,
    TileComponent,
    TemplateComponent
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
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
