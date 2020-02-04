import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../model/tile.model';
import {LaunchpadService} from '../launchpad/service/launchpad.service';
import {NotificationService} from '../notification/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnDestroy {

  @Input()
  private tile: Tile;
  private subscription: Subscription;
  private isStarted: boolean;

  constructor(private launchpadService: LaunchpadService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.subscription = this.launchpadService.appResponse$
      .subscribe(response => {
        this.notificationService.createSnackBar(response.message, 'Dismiss', 2000);
      });
  }

  onStart() {
    const appId = this.tile.application.id;
    this.launchpadService.startApplication(appId);
    this.isStarted = true;
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : this.subscription = null;
  }

  onStop() {
    this.isStarted = false;
    this.notificationService.createSnackBar('stopped', 'Dismiss', 2000);
  }
}
