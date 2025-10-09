import SignInPage from '@app/(tabs)/auth/sign-in';
import SignUpPage from '@app/(tabs)/auth/sign-up';
import GuestGuard from '@components/guards/GuestGuard';
import ROUTES from '@constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const AuthStack = createNativeStackNavigator();

const AuthLayout: NavScreen = ({ navigation }) => {
  return (
    <GuestGuard navigation={navigation}>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen
          name={ROUTES.auth.signUp()}
          component={SignUpPage}
          options={SignUpPage.options}
        />
        <AuthStack.Screen
          name={ROUTES.auth.signIn()}
          component={SignInPage}
          options={SignInPage.options}
        />
      </AuthStack.Navigator>
    </GuestGuard>
  );
};

export default AuthLayout;
