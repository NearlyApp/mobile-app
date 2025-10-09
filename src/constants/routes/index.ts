import AUTH_ROUTES from '@constants/routes/auth';
import DISCOVER_ROUTES from '@constants/routes/discover';
import HOME_ROUTES from '@constants/routes/home';
import PROFILE_ROUTES from '@constants/routes/profile';
import SETTINGS_ROUTES from '@constants/routes/settings';

const ROUTES = {
  home: HOME_ROUTES,
  discover: DISCOVER_ROUTES,
  profile: PROFILE_ROUTES,
  auth: AUTH_ROUTES,
  settings: SETTINGS_ROUTES,

  publish: () => 'publish',

  tabs: () => '(tabs)',
};

export default ROUTES;
