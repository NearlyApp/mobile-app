import FullScreenLoader from '@components/ui/loading/FullScreenLoader';
import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { Redirect } from 'expo-router';

interface IProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<IProps> = ({ children }) => {
  const { data: user, isLoading, isFetched } = useCurrentUser();

  if (isLoading) return <FullScreenLoader />;

  if (isFetched && user) return <Redirect href={ROUTES.profile(user.uuid)} />;

  return children;
};

export default GuestGuard;
