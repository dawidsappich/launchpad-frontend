import {Component, OnDestroy, OnInit} from '@angular/core';
import {LaunchpadService} from './service/launchpad.service';
import {Launchpad} from '../model/launchpad.model';
import {Subscription} from 'rxjs';
import {Template} from '../model/template.model';

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

  constructor(private launchpadService: LaunchpadService) { }

  ngOnInit() {
    this.launchpadSubscription$ = this.launchpadService.launchpad$.subscribe(launchpad => this.launchpad = launchpad);
    this.templatesSubscription$ = this.launchpadService.templates$.subscribe(templates => {
      console.log(templates);
      this.templates = templates;
    });
    this.launchpadService.loadLaunchPad();
    this.launchpadService.loadTemplates();
  }

  ngOnDestroy(): void {
    this.launchpadSubscription$ ? this.launchpadSubscription$.unsubscribe() : this.launchpadSubscription$ = null;
    this.templatesSubscription$ ? this.templatesSubscription$.unsubscribe() : this.templatesSubscription$ = null;
  }

}
