import {Component, OnDestroy, OnInit} from '@angular/core';
import {LaunchpadService} from './service/launchpad.service';
import {Launchpad} from '../model/launchpad.model';
import {Subscription} from 'rxjs';
import {Template} from '../model/template.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit, OnDestroy {
  private launchpad: Launchpad;
  private launchpadSubscription$: Subscription;
  private templates: Template[];
  private templatesSubscription$: Subscription;
  private isAdmin: boolean;
  private isAdminSubscription$: Subscription;

  constructor(private launchpadService: LaunchpadService, private authService: AuthService) { }

  ngOnInit() {
    this.isAdminSubscription$ = this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.launchpadSubscription$ = this.launchpadService.launchpad$.subscribe(launchpad => this.launchpad = launchpad);
    this.templatesSubscription$ = this.launchpadService.templates$.subscribe(templates => {
      console.log(templates);
      this.templates = templates;
    });
    this.launchpadService.loadLaunchPad();
    this.launchpadService.loadTemplates();
    this.authService.isAdminUser();
  }

  ngOnDestroy(): void {
    this.launchpadSubscription$ ? this.launchpadSubscription$.unsubscribe() : this.launchpadSubscription$ = null;
    this.templatesSubscription$ ? this.templatesSubscription$.unsubscribe() : this.templatesSubscription$ = null;
    this.isAdminSubscription$ ? this.isAdminSubscription$.unsubscribe() : this.isAdminSubscription$ = null;
  }

}
