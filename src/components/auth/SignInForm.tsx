import i18n from '@/i18n';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Text } from '@components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignIn from '@hooks/auth/useSignIn';
import { signInSchema } from '@schemas/auth';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import z from 'zod';

type FormValues = z.infer<typeof signInSchema>;

const SignInForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  const mutation = useSignIn();

  function onSubmit(data: FormValues) {
    mutation.mutate(
      {
        login: data.login,
        password: data.password,
        rememberMe: data.rememberMe,
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
    <Form {...form}>
      <FormField
        control={form.control}
        name="login"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{i18n.t('auth.signIn.field.login.label')}</FormLabel>
            <Input
              autoComplete="username"
              {...field}
              value={field.value as string}
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
            <FormLabel>{i18n.t('auth.signIn.field.password.label')}</FormLabel>
            <Input
              secureTextEntry
              autoComplete="current-password"
              autoCapitalize="none"
              {...field}
              value={field.value as string}
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
        name="rememberMe"
        render={({ field }) => (
          <FormItem>
            <View className="flex-row gap-2">
              <Checkbox
                checked={field.value as boolean}
                onCheckedChange={(checked: boolean) =>
                  field.onChange({ target: { value: checked } })
                }
                {...field}
              />
              <FormLabel>
                {i18n.t('auth.signIn.field.rememberMe.label')}
              </FormLabel>
            </View>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button onPress={form.handleSubmit(onSubmit)}>
        <Text>{i18n.t('auth.signIn.submit')}</Text>
      </Button>
    </Form>
  );
};

export default SignInForm;
