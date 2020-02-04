import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Launchpad} from '../../model/launchpad.model';
import {Subject} from 'rxjs';
import {ApplicationResponse} from '../../model/application-response.model';
import {NotificationService} from '../../notification/notification.service';
import {Template} from '../../model/template.model';


@Injectable({
  providedIn: 'root'
})
export class LaunchpadService {
  // tslint:disable-next-line:variable-name
  private _launchpad$: Subject<Launchpad> = new Subject<Launchpad>();
  // tslint:disable-next-line:variable-name
  private _templates$: Subject<Template[]> = new Subject<Template[]>();

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
  }


  loadLaunchPad() {
    this.httpClient.get<Launchpad>(`${environment.basePath}${environment.launchpadAllTilesUrl}`)
      .subscribe(launchpad => {
        this._launchpad$.next(launchpad);
      }, error => {
      });
  }

  get launchpad$(): Subject<Launchpad> {
    return this._launchpad$;
  }

  get templates$(): Subject<Template[]> {
    return this._templates$;
  }

  startApplication(appId: number) {
    this.httpClient.get<ApplicationResponse>(`${environment.basePath}${environment.launchpadStartApplicationUrl}/${appId}`)
      .subscribe(response => {
        this.notificationService.createSnackBar(response.message, 'Dismiss', 2000);
      });
  }

  loadTemplates() {
    this.httpClient.get<ApplicationResponse>(`${environment.basePath}${environment.allTemplatesUrl}`)
      .subscribe(response => {
        this._templates$.next(response.payload);
      });
  }
}
