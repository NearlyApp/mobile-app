import Header from '@components/profile/header';
import ProfilePosts from '@components/profile/posts';
import { USERS_QUERY_KEYS, useUser } from '@modules/users/users.hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilePage: NavScreen = ({ route }) => {
  const { uuid } = route.params;

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
    isFetched,
  } = useUser(uuid);

  const handleRefresh = useCallback(() => {
    refetch();
    queryClient.invalidateQueries({
      queryKey: USERS_QUERY_KEYS.user(uuid),
    });
    queryClient.invalidateQueries({
      queryKey: USERS_QUERY_KEYS.userPosts(uuid),
    });
  }, [refetch, queryClient]);

  if (!isFetched && !user) return null;

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
        <ProfilePosts uuid={uuid} className="flex-1" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
