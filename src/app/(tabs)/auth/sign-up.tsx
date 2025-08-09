import { Button } from '@components/ui/button';
import { FormField } from '@components/ui/form';
import { Text } from '@components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignUp from '@hooks/auth/useSignUp';
import { signUpSchema } from '@schemas/auth';
import { Redirect } from 'expo-router';
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

  function onSubmit(data: FormValues) {
    mutation.mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          form.reset();
          Redirect({
            href: '/profile',
          });
        },
        onError: (error) => {
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
    <SafeAreaView className="flex flex-col items-stretch gap-4 p-8">
      <FormField
        control={form.control}
        formState={form.formState}
        name="username"
        label="Username"
      />
      <FormField
        control={form.control}
        formState={form.formState}
        name="email"
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormField
        control={form.control}
        formState={form.formState}
        name="password"
        label="Password"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormField
        control={form.control}
        formState={form.formState}
        name="confirmPassword"
        label="Confirm Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <Button
        onPress={form.handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      >
        <Text>Submit</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignUpScreen;
