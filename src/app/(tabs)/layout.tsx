import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import ROUTES from '@constants/routes';
import { useCurrentUser } from '@modules/users/users.hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import { Home, PlusCircle, User } from 'lucide-react-native';
import React, { useMemo } from 'react';

// Import page components and layouts
import AuthLayout from '@app/(tabs)/auth/layout';
import MainLayout from '@app/(tabs)/main/layout';

const Tab = createBottomTabNavigator();

const PublishButton: React.FC = () => null;
const ProfileButton: React.FC = () => null;

const TabsLayout: NavScreen = () => {
  const { data: user } = useCurrentUser();

  // Get current route state to check if we're on the user's own profile
  const navigationState = useNavigationState((state) => state);
  const isOnOwnProfile = useMemo(() => {
    if (!user || !navigationState) return false;
    const currentRoute = navigationState.routes[navigationState.index];
    const params = currentRoute?.params as { uuid?: string } | undefined;
    // Check if we're on the profile route with the current user's uuid
    return (
      currentRoute?.name === ROUTES.main.profile() && params?.uuid === user.uuid
    );
  }, [user, navigationState]);

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
              name="profileBtn"
              component={ProfileButton}
              options={{
                tabBarIcon: () => (
                  <Avatar focused={isOnOwnProfile} size="sm" alt="User Avatar">
                    <AvatarImage src={user?.avatarUrl || undefined} />
                    <AvatarFallback />
                  </Avatar>
                ),
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate(ROUTES.main(), {
                    screen: ROUTES.main.profile(),
                    params: { uuid: user!.uuid },
                  });
                },
              })}
            />,
          ]
        : [],
    [user, isOnOwnProfile],
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
        name={ROUTES.main()}
        component={MainLayout}
        options={{
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      {publicScreens}
      {restrictedScreens}
    </Tab.Navigator>
  );
};

export default TabsLayout;
