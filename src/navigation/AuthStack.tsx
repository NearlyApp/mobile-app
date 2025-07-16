// navigation/AuthStack.tsx
import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "@screens/signin";
import SignUpScreen from "@screens/signup";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthStack;
