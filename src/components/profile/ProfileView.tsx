import Header from '@components/profile/Header';
import useUser from '@hooks/users/useUser';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  uuid: string;
  isPersonalProfile: boolean;
};

const ProfileView: React.FC<Props> = ({ uuid, isPersonalProfile = false }) => {
  const { data: user, isLoading, isFetching, isError, refetch } = useUser(uuid);

  if (isError) return <SafeAreaView className="flex-1"></SafeAreaView>;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="h-full"
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
          />
        }
      >
        <Header uuid={uuid} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileView;
