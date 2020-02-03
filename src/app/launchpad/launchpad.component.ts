import {Component, OnDestroy, OnInit} from '@angular/core';
import {LaunchpadService} from './service/launchpad.service';
import {Launchpad} from '../model/launchpad.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit, OnDestroy {
  private launchpad: Launchpad;
  private launchpadSubscription$: Subscription;

  constructor(private launchpadService: LaunchpadService) { }

  ngOnInit() {
    this.launchpadService.launchpad$.subscribe(launchpad => this.launchpad = launchpad);
    this.launchpadService.loadLaunchPad();
  }

  ngOnDestroy(): void {
    this.launchpadSubscription$ ? this.launchpadSubscription$.unsubscribe() : this.launchpadSubscription$ = null;
  }

}
