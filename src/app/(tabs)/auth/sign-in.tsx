import i18n from '@/i18n';
import SignInForm from '@components/auth/SignInForm';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInPage: NavScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      className="flex flex-1 flex-col gap-8 p-8"
    >
      <Text className="text-center" size="headlineMd" weight="medium">
        {i18n.t('auth.signIn.title')}
      </Text>

      <SignInForm />

      <Text size="bodyMd">
        {i18n.t('auth.signIn.noAccount.text')}{' '}
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.auth.signUp())}
        >
          <Text weight="bold">{i18n.t('auth.signIn.noAccount.link')}</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default SignInPage;
