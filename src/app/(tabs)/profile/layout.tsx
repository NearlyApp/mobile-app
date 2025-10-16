import ProfilePage from '@app/(tabs)/profile';
import ROUTES from '@constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const ProfileStack = createNativeStackNavigator();

const ProfileLayout: NavScreen = ({ route }) => {
  const params = route.params || {};

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name={ROUTES.profile()}
        component={ProfilePage}
        initialParams={params}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileLayout;
