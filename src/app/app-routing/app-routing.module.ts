import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {LaunchpadComponent} from '../launchpad/launchpad.component';
import {AuthGuard} from '../auth/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch : 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'launchpad', canActivate: [AuthGuard], component: LaunchpadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
