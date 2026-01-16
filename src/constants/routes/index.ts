import AUTH_ROUTES from '@constants/routes/auth';
import DISCOVER_ROUTES from '@constants/routes/discover';
import MAIN_ROUTES from '@constants/routes/main';
import SETTINGS_ROUTES from '@constants/routes/settings';

const ROUTES = {
  main: MAIN_ROUTES,
  discover: DISCOVER_ROUTES,
  auth: AUTH_ROUTES,
  settings: SETTINGS_ROUTES,

  publish: () => 'publish',

  tabs: () => '(tabs)',
};

export default ROUTES;
