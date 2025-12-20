import FullScreenLoader from '@components/ui/loading/FullScreenLoader';
import ROUTES from '@constants/routes';
import { useCurrentUser } from '@modules/users/users.hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

interface IProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any, string, undefined>;
}

const GuestGuard: React.FC<IProps> = ({ children, navigation }) => {
  const { data: user, isLoading, isFetched } = useCurrentUser();

  useLayoutEffect(() => {
    if (isFetched && user) navigation.navigate(ROUTES.profile());
  }, [isFetched, user]);

  if (isLoading) return <FullScreenLoader />;

  return children;
};

export default GuestGuard;
