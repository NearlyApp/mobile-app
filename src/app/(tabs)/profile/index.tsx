import Header from '@components/profile/header';
import ProfilePosts from '@components/profile/posts';
import { useUser } from '@modules/users/users.hooks';
import { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilePage: NavScreen = ({ route }) => {
  const { uuid } = route.params;

  const { data: user, isLoading, isFetching, refetch } = useUser(uuid);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView
        className="flex h-full flex-col"
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={handleRefresh}
          />
        }
      >
        <Header uuid={uuid} />
        <ProfilePosts
          uuid={uuid}
          className="flex-1"
          onRefetch={handleRefresh}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
