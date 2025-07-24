import Container from '@components/containers';
import Button from '@components/ui/buttons';
import { FieldCheckbox, TextField } from '@components/ui/fields/index';
import { useToast } from '@components/ui/toast';
import { StackParamList } from '@custom-types/navigation';
import useSignIn from '@hooks/auth/useSignIn';
import useCurrentUser from '@hooks/users/useCurrentUser';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SPACING } from '@styles/variables';
import { FC, useEffect, useState } from 'react';
import styles from './styles';

interface SignInFormProps {
  navigation: NativeStackNavigationProp<StackParamList, 'SignIn', undefined>;
}
export const SignInForm: FC<SignInFormProps> = ({ navigation }) => {
  const { toast } = useToast();
  const signIn = useSignIn();
  const { data: user } = useCurrentUser();

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, []);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function handleSignIn() {
    signIn.mutate(
      {
        login,
        password,
        rememberMe,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Sign in successful',
            description: 'Welcome back!',
            variant: 'success',
          });
          navigation.navigate('Home');
        },
        onError: (error) => {
          toast({
            title: 'Sign in failed',
            description: error.data.statusCode,
            variant: 'destructive',
          });
        },
      },
    );
  }

  return (
    <Container>
      <TextField placeholder="Login" value={login} onChangeText={setLogin} />
      <TextField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Container style={styles.row} includeSafeArea={false}>
        <FieldCheckbox
          value={rememberMe}
          onChange={setRememberMe}
          label="Remember me"
        />

        <Button onPress={() => navigation.navigate('ResetPassword')}>
          Forgot Password
        </Button>
      </Container>
      <Button
        style={{ marginTop: SPACING.medium }}
        variant="primary"
        disabled={!login || !password || signIn.isPending}
        onPress={handleSignIn}
      >
        Sign In
      </Button>
    </Container>
  );
};
