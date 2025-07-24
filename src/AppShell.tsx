import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@screens/home';

import AuthStack from '@/navigation/AuthStack';
import { RootStackParamList } from '@custom-types/navigation';
import { useOnAppForeground } from '@hooks/useOnAppForeground';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { COLORS, SPACING } from '@styles/variables';
import { HomeIcon, UserIcon } from 'lucide-react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator: React.FC = () => (
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

const AppShell: React.FC = () => {
  const { refetch } = useCurrentUser();

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
