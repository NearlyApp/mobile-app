import i18n from '@/i18n';
import SignUpForm from '@components/auth/SignUpForm';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpPage: NavScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      className="flex flex-1 flex-col gap-8 p-8"
    >
      <Text className="text-center" size="headlineMd" weight="medium">
        {i18n.t('auth.signUp.title')}
      </Text>

      <SignUpForm />

      <Text size="bodyMd">
        {i18n.t('auth.signUp.alreadyHaveAccount.text')}{' '}
        <Text
          weight="bold"
          onPress={() => navigation.navigate(ROUTES.auth.signIn())}
        >
          {i18n.t('auth.signUp.alreadyHaveAccount.link')}
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignUpPage;
