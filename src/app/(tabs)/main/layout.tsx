import HomePage from '@app/(tabs)/main/home';
import ProfileLayout from '@app/(tabs)/main/profile/layout';
import ROUTES from '@constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const MainStack = createNativeStackNavigator();

const MainLayout: NavScreen = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name={ROUTES.main.home()}
        component={HomePage}
        options={HomePage.options}
      />
      <MainStack.Screen name={ROUTES.main.profile()} component={ProfileLayout} />
    </MainStack.Navigator>
  );
};

export default MainLayout;
