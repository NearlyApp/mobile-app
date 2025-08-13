import FullScreenLoader from '@components/ui/loading/FullScreenLoader';
import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { Redirect, useRouter } from 'expo-router';

const ProfileIndex: React.FC = () => {
  const { data: user, isFetched, isError } = useCurrentUser();

  if (isFetched && user) return <Redirect href={ROUTES.profile(user.uuid)} />;

  if ((isFetched && !user) || isError)
    return <Redirect href={ROUTES.auth.signUp()} />;

  return <FullScreenLoader />;
};

export default ProfileIndex;
