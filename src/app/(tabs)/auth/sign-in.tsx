import i18n from '@/i18n';
import SignInForm from '@components/auth/SignInForm';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex flex-col gap-8 p-8">
      <Text className="text-center" size="headlineMd" weight="medium">
        {i18n.t('auth.signIn.title')}
      </Text>

      <SignInForm />

      <Text size="bodyMd">
        {i18n.t('auth.signIn.noAccount.text')}{' '}
        <Text asChild weight="bold">
          <Link href={ROUTES.auth.signUp()}>
            {i18n.t('auth.signIn.noAccount.link')}
          </Link>
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignInScreen;
