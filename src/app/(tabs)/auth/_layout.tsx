import GuestGuard from '@components/guards/GuestGuard';
import ROUTES from '@constants/routes';
import { Stack } from 'expo-router';

const AuthLayout: React.FC = () => (
  <GuestGuard>
    <Stack
      initialRouteName={ROUTES.auth.signUp()}
      screenOptions={{ headerShown: false }}
    />
  </GuestGuard>
);

export default AuthLayout;
