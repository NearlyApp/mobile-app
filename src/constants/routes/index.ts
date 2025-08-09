import AUTH_ROUTES from '@constants/routes/auth';
import HOME_ROUTES from '@constants/routes/home';
import PROFILE_ROUTES from '@constants/routes/profile';

const ROUTES = {
  home: HOME_ROUTES,
  profile: PROFILE_ROUTES,
  auth: AUTH_ROUTES,

  tabs: () => '(tabs)',
};

export default ROUTES;
