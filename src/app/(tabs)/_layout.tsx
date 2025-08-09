import ROUTES from '@constants/routes';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { Tabs } from 'expo-router';
import { Home, User } from 'lucide-react-native';

const TabsLayout: React.FC = () => {
  const { data: user } = useCurrentUser();

  return (
    <Tabs
      initialRouteName={ROUTES.home()}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name={ROUTES.home()}
        options={{
          tabBarIcon: ({ focused, size }) => <Home size={size} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.auth()}
        options={{
          tabBarIcon: ({ focused, size }) => <User size={size} />,
          href: user ? null : undefined, // Hide auth tab if user is logged in
        }}
      />
      <Tabs.Screen
        name={ROUTES.profile()}
        options={{
          tabBarIcon: ({ focused, size }) => <User size={size} />,
          href: !user ? null : undefined, // Hide profile tab if user is not logged in
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
