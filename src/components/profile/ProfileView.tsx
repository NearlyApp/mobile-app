import Header from '@components/profile/Header';
import useUser from '@hooks/users/useUser';
import { useCallback, useRef } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfilePosts from './Posts';

type Props = {
  uuid: string;
  isPersonalProfile: boolean;
};

const ProfileView: React.FC<Props> = ({ uuid, isPersonalProfile = false }) => {
  const { data: user, isLoading, isFetching, isError, refetch } = useUser(uuid);
  const postsRefetchRef = useRef<(() => void) | null>(null);

  const handleRefresh = useCallback(() => {
    refetch();
    if (postsRefetchRef.current) {
      postsRefetchRef.current();
    }
  }, [refetch]);

  if (isError) return <SafeAreaView className="flex-1"></SafeAreaView>;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="h-full"
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={handleRefresh}
          />
        }
      >
        <Header uuid={uuid} isPersonalProfile={isPersonalProfile} />
        <ProfilePosts uuid={uuid} onRefetchReady={(refetchFn) => postsRefetchRef.current = refetchFn} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileView;
