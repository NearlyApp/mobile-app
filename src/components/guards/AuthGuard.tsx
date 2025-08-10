import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IProps> = ({ children }) => {
  const { data: user, isLoading, isFetched } = useCurrentUser();

  if (isLoading)
    return (
      <SafeAreaView className="flex flex-col items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  if (isFetched && !user) return <Redirect href={ROUTES.auth.signUp()} />;

  return children;
};

export default AuthGuard;
