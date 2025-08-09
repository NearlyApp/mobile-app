const PROFILE_ROUTES = (uuid?: string) =>
  uuid ? `profile/${uuid}` : 'profile';

export default PROFILE_ROUTES;
