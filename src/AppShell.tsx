import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '@screens/home';

import AuthStack from '@/navigation/AuthStack';
import { RootStackParamList } from '@custom-types/navigation';
import { useOnAppForeground } from '@hooks/useOnAppForeground';
import useSession from '@hooks/useSession';
import { COLORS, SPACING } from '@styles/variables';
import { HomeIcon, UserIcon } from 'lucide-react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();
// const Stack = createNativeStackNavigator();

const TabNavigator: FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      headerTitle: '',
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
  const { refetch } = useSession();

  useOnAppForeground(() => {
    refetch();
  });

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppShell;
