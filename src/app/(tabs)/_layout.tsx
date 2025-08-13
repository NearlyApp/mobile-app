import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
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
          tabBarIcon: ({ size }) => <Home size={size} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.auth()}
        options={{
          tabBarIcon: ({ size }) => <User size={size} />,
          href: user ? null : undefined,
        }}
      />
      <Tabs.Screen
        name={ROUTES.profile()}
        options={{
          href: !user ? null : undefined,
          tabBarIcon: () => (
            <Avatar size="sm" alt="User Avatar">
              <AvatarImage src={user?.avatarUrl || undefined} />
              <AvatarFallback />
            </Avatar>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
