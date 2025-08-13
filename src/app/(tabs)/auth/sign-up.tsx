import i18n from '@/i18n';
import SignUpForm from '@components/auth/SignUpForm';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { Link } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex flex-col gap-8 p-8">
      <Text className="text-center" size="headlineMd" weight="medium">
        {i18n.t('auth.signUp.title')}
      </Text>

      <SignUpForm />

      <Text size="bodyMd">
        {i18n.t('auth.signUp.alreadyHaveAccount.text')}{' '}
        <Text asChild weight="bold">
          <Link href={ROUTES.auth.signIn()}>
            {i18n.t('auth.signUp.alreadyHaveAccount.link')}
          </Link>
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignUpScreen;
