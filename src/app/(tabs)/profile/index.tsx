import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileIndex: React.FC = () => {
  const { data: user, isFetched, isFetching, isError } = useCurrentUser();

  if (isFetched && user) return <Redirect href={ROUTES.profile(user.uuid)} />;

  if ((isFetched && !user) || isError)
    return <Redirect href={ROUTES.auth.signUp()} />;

  return (
    <SafeAreaView className="flex flex-col items-center justify-center">
      <Text>Loading...</Text>
    </SafeAreaView>
  );
};

export default ProfileIndex;
