import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../model/tile.model';
import {LaunchpadService} from '../launchpad/service/launchpad.service';
import {NotificationService} from '../notification/notification.service';
import {Subscription} from 'rxjs';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})

export class TileComponent implements OnInit, OnDestroy {

  private faEditIcon = faEdit;

  @Input()
  private tile: Tile;
  private subscription: Subscription;
  private isStarted: boolean;
  isAdminUser: boolean;
  private isAdminSubscription$: Subscription;

  constructor(private launchpadService: LaunchpadService,
              private notificationService: NotificationService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    // check if user is admin
    this.isAdminSubscription$ = this.authService.isAdmin$
      .subscribe(isAdmin => this.isAdminUser = isAdmin);
    this.authService.isAdminUser();
  }


  onStart() {
    const appId = this.tile.application.id;
    this.launchpadService.startApplication(appId);
    this.isStarted = true;
  }

  onStop() {
    this.isStarted = false;
    this.notificationService.createSnackBar('stopped', 'Dismiss', 2000);
  }

  ngOnDestroy(): void {
    this.isAdminSubscription$ ? this.isAdminSubscription$.unsubscribe() : this.isAdminSubscription$ = null;
  }
}
