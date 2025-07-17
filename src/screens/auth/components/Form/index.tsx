import Container from '@components/containers';
import Button from '@components/ui/buttons';
import { FieldCheckbox, FieldText } from '@components/ui/fields/index';
import { FormErrorToast, useToast } from '@components/ui/toast';
import { StackParamList } from '@custom-types/navigation';
import useSession from '@hooks/auth/useSession';
import { post } from '@lib/queries';
import { FormError } from '@lib/queries/error';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SPACING } from '@styles/variables';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import styles from './styles';
import { User } from '@nearlyapp/common';

interface SignInFormProps {
  navigation: NativeStackNavigationProp<StackParamList, 'SignIn', undefined>;
}
export const SignInForm: FC<SignInFormProps> = ({ navigation }) => {
  const { toast } = useToast();
  // const { saveUser } = useAuth();
  const { refetch: saveUser } = useSession();

  const [login, setLogin] = useState('Olivier');
  const [password, setPassword] = useState('OIivier77@');
  const [rememberMe, setRememberMe] = useState(false);

  const mutation = useMutation({
    mutationKey: ['signIn', login, password, rememberMe],
    mutationFn: async () =>
      post<User>('/auth/sign-in/', { login, password, rememberMe }),
    onSuccess: () => {
      saveUser();
      toast({
        title: 'Sign in successful',
        description: 'Welcome back!',
        variant: 'success',
      });
      navigation.navigate('Home');
    },
    onError: (error) => {
      if (error instanceof FormError) {
        toast(FormErrorToast(error));
      } else {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <Container>
      <FieldText placeholder="Login" value={login} onChangeText={setLogin} />
      <FieldText
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
        disabled={!login || !password || mutation.isPending}
        onPress={mutation.mutate}
      >
        Sign In
      </Button>
    </Container>
  );
};
