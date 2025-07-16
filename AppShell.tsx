import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/home";

import { COLORS, SPACING } from "@styles/variables";
import { HomeIcon, UserIcon } from "lucide-react-native";
import { RootStackParamList } from "@custom-types/navigation";
import AuthStack from "@/navigation/AuthStack";

const Tab = createBottomTabNavigator<RootStackParamList>();
// const Stack = createNativeStackNavigator();

const TabNavigator: FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      headerTitle: "",
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray500,
      tabBarStyle: {
        paddingVertical: SPACING.medium,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Auth"
      component={AuthStack}
      options={{
        tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const AppShell: FC = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppShell;
