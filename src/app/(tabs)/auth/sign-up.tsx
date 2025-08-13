import i18n from '@/i18n';
import { Button } from '@components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignUp from '@hooks/auth/useSignUp';
import { signUpSchema } from '@schemas/auth';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { SafeAreaView } from 'react-native-safe-area-context';
import z from 'zod';

type FormValues = z.infer<typeof signUpSchema>;

const SignUpScreen: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const mutation = useSignUp();
  const router = useRouter();

  function onSubmit(data: FormValues) {
    mutation.mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          form.reset();
        },
        onError: (error) => {
          /**
           * @todo Fix this error handling
           */
          if (error.data.errors && Object.keys(error.data.errors).length > 0)
            for (const [key, value] of Object.entries(error.data.errors)) {
              form.setError(key as keyof FormValues, {
                type: 'manual',
                message: value[0],
              });
            }
        },
      },
    );
  }

  return (
    <SafeAreaView className="flex flex-col gap-8 p-8">
      <Text className="text-center" size="headlineMd" weight="medium">
        {i18n.t('auth.signUp.title')}
      </Text>
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {i18n.t('auth.signUp.field.username.label')}
              </FormLabel>
              <Input
                autoComplete="username"
                {...field}
                onChangeText={(value: string) =>
                  field.onChange({ target: { value } })
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i18n.t('auth.signUp.field.email.label')}</FormLabel>
              <Input
                autoComplete="email"
                keyboardType="email-address"
                autoCapitalize="none"
                {...field}
                onChangeText={(value: string) =>
                  field.onChange({ target: { value } })
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {i18n.t('auth.signUp.field.password.label')}
              </FormLabel>
              <Input
                autoComplete="new-password"
                secureTextEntry
                autoCapitalize="none"
                {...field}
                onChangeText={(value: string) =>
                  field.onChange({ target: { value } })
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {i18n.t('auth.signUp.field.confirmPassword.label')}
              </FormLabel>
              <Input
                autoComplete="new-password"
                secureTextEntry
                autoCapitalize="none"
                {...field}
                onChangeText={(value: string) =>
                  field.onChange({ target: { value } })
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onPress={form.handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        >
          <Text>{i18n.t('auth.signUp.submit')}</Text>
        </Button>
      </Form>
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
