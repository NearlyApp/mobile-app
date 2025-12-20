import FullScreenLoader from '@components/ui/loading/full-screen-loader';
import ROUTES from '@constants/routes';
import { useCurrentUser } from '@modules/users/users.hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

interface IProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any, string, undefined>;
}

const RestrictedGuard: React.FC<IProps> = ({ children, navigation }) => {
  const { data: user, isLoading, isFetched, isError } = useCurrentUser();

  useLayoutEffect(() => {
    if ((isFetched && !user) || isError)
      navigation.navigate(ROUTES.auth.signUp());
  }, [isFetched, user, isError]);

  if (isLoading) return <FullScreenLoader />;

  return children;
};

export default RestrictedGuard;
