import { Skeleton } from '@components/ui/skeleton';
import { Text } from '@components/ui/text';
import useUser from '@hooks/users/useUser';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { data: user, isFetched, isError, error, refetch } = useUser(uuid);

  if (isError)
    return <SafeAreaView></SafeAreaView>

  return (
    <SafeAreaView>
      {isFetched && user ? <Text>{user.displayName}</Text> : <Skeleton />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
