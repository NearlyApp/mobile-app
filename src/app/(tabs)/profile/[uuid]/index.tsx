import Header from '@components/profile/Header';
import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Text } from '@components/ui/text';
import useUser from '@hooks/users/useUser';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ArrowLeft, EllipsisVertical, Settings } from 'lucide-react-native';
import { useLayoutEffect, useMemo } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { data: user, isFetching, isError, refetch } = useUser(uuid);
  const navigation = useNavigation();

  const isUserProfile = useMemo(() => {
    return user?.uuid === uuid;
  }, [user?.uuid, uuid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()} variant="ghost">
          <ArrowLeft />
        </Button>
      ),
      headerTitle: () =>
        user ? (
          <Text size="titleMd" numberOfLines={1}>{user.displayName}</Text>
        ) : (
          <Skeleton className="h-title-md w-2/4" />
        ),
      headerRight: () =>
        isUserProfile ? (
          <Button variant="ghost">
            <Settings />
          </Button>
        ) : (
          <Button>
            <EllipsisVertical />
          </Button>
        ),
      headerShown: true,
    });
  }, [navigation, user]);

  if (isError) return <SafeAreaView></SafeAreaView>;

  return (
    <ScrollView
      className="flex flex-1 flex-col"
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      <Header uuid={uuid} />
    </ScrollView>
  );
};

export default ProfileScreen;
