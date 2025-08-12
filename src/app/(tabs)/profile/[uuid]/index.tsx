import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Skeleton } from '@components/ui/skeleton';
import { Text } from '@components/ui/text';
import useUser from '@hooks/users/useUser';
import { useLocalSearchParams } from 'expo-router';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const {
    data: user,
    isFetched,
    isFetching,
    isError,
    error,
    refetch,
  } = useUser(uuid);

  if (isError) return <SafeAreaView></SafeAreaView>;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex flex-col gap-8 p-8"
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <View className="flex flex-row items-start gap-4">
          <Avatar alt="User Avatar">
            <AvatarImage src={user?.avatarUrl || undefined} />
            <AvatarFallback />
          </Avatar>
          <View className="flex flex-1 flex-col gap-2">
            {isFetched && user ? (
              <Text size="titleMd">{user.displayName}</Text>
            ) : (
              <Skeleton className="h-title-md" />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
