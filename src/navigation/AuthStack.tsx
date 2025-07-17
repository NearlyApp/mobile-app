import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "@screens/auth/sign-in";
import SignUpScreen from "@screens/auth/sign-up";
import ResetPasswordScreen from "@screens/auth/reset-password";
import { AuthStackParamList } from "@custom-types/navigation";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

export default AuthStack;
