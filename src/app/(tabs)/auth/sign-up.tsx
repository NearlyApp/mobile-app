import i18n from '@/i18n';
import SignUpForm from '@components/auth/SignUpForm';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpPage: NavScreen = ({ navigation, route }) => {
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
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.auth.signIn())}
        >
          <Text weight="bold">
            {i18n.t('auth.signUp.alreadyHaveAccount.link')}
          </Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default SignUpPage;
