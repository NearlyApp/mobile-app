import ProfilePage from '@app/(tabs)/main/profile';
import { Button } from '@components/ui/button';
import FullScreenLoader from '@components/ui/loading/full-screen-loader';
import ROUTES from '@constants/routes';
import { useUser } from '@modules/users/users.hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileStack = createNativeStackNavigator();

const ProfileLayout: NavScreen = ({ route }) => {
  const params = route.params || {};

  const {
    data: user,
    isFetched,
    isError,
    error,
    refetch,
  } = useUser(params.uuid);

  if (isError || !params.uuid)
    return (
      <SafeAreaView className="flex h-full w-full flex-1 items-center justify-center">
        <View className="w-fit -translate-y-1/2">
          <Text>{error?.message || 'Oops! Something went wrong.'}</Text>
          {error?.status !== 404 && (
            <Button onPress={() => refetch()}>
              <Text>Retry</Text>
            </Button>
          )}
        </View>
      </SafeAreaView>
    );

  if (isFetched && user)
    return (
      <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen
          name={ROUTES.main.profile()}
          component={ProfilePage}
          initialParams={params}
        />
      </ProfileStack.Navigator>
    );

  return <FullScreenLoader />;
};

export default ProfileLayout;
