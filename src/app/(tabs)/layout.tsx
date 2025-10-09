import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PlusCircle, Search, User } from 'lucide-react-native';
import React, { useMemo } from 'react';

// Import page components and layouts
import AuthLayout from '@app/(tabs)/auth/layout';
import DiscoverPage from '@app/(tabs)/discover';
import HomePage from '@app/(tabs)/home';
import ProfileLayout from '@app/(tabs)/profile/layout';

const Tab = createBottomTabNavigator();

const PublishButton: React.FC = () => null;

const TabsLayout: NavScreen = () => {
  const { data: user } = useCurrentUser();

  const publicScreens: React.ReactNode[] = useMemo(
    () =>
      !user
        ? [
            <Tab.Screen
              name={ROUTES.auth()}
              component={AuthLayout}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />,
          ]
        : [],
    [user],
  );

  const restrictedScreens: React.ReactNode[] = useMemo(
    () =>
      user
        ? [
            <Tab.Screen
              name="publishBtn"
              component={PublishButton}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <PlusCircle size={size} color={color} />
                ),
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate(ROUTES.publish());
                },
              })}
            />,
            <Tab.Screen
              name={ROUTES.profile()}
              component={ProfileLayout}
              options={{
                tabBarIcon: ({ focused, size }) => (
                  <Avatar focused={focused} size="sm" alt="User Avatar">
                    <AvatarImage src={user?.avatarUrl || undefined} />
                    <AvatarFallback />
                  </Avatar>
                ),
              }}
              initialParams={{ uuid: user.uuid }}
            />,
          ]
        : [],
    [user],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00bcff', // sky-400
      }}
    >
      <Tab.Screen
        name={ROUTES.home()}
        component={HomePage}
        options={{
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.discover()}
        component={DiscoverPage}
        options={{
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      {publicScreens}
      {restrictedScreens}
    </Tab.Navigator>
  );
};

export default TabsLayout;
