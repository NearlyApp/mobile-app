import FullScreenLoader from '@components/ui/loading/FullScreenLoader';
import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { Redirect } from 'expo-router';

interface IProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IProps> = ({ children }) => {
  const { data: user, isLoading, isFetched, isError } = useCurrentUser();

  if (isLoading) return <FullScreenLoader />;

  if ((isFetched && !user) || isError)
    return <Redirect href={ROUTES.auth.signUp()} />;

  return children;
};

export default AuthGuard;
