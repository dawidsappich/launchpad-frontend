import {commonUrl} from '../app/shared/url';


export const environment = {
  production: true,
  basePath: '/api/v1',
  userLoginUrl: commonUrl.userLoginUrl,
  launchpadAllTilesUrl: commonUrl.allTilesUrl,
  launchpadStartApplicationUrl: commonUrl.startAppUrl,
  allTemplatesUrl: commonUrl.allTemplatesUrl,
  userRoleUrl: commonUrl.userRoleUrl,
  addTileUrl: commonUrl.addTileUrl,
  updateTileUrl: commonUrl.updateTileUrl
};
