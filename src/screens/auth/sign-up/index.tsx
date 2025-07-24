import Container from '@components/containers';
import { TextField } from '@components/ui/fields';
import { DisplayText } from '@components/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from '@nearlyapp/common/schemas/users';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, View } from 'react-native';
import z from 'zod';

const formSchema = z.object({
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .regex(USERNAME_REGEX),
  email: z.email(),
  password: z
    .string()
    .min(8, 'Your password must be at least 8 characters long')
    .regex(/[a-z]/, 'Your password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Your password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Your password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Your password must contain at least one symbol'),
  confirmPassword: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpScreen: NavScreen<'SignUp'> = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function handleSubmit(data: FormValues) {
    // Handle sign-up logic here
    console.log('Form submitted:', data);
  }

  return (
    <Container>
      <DisplayText>SignUp screen</DisplayText>

      <View>
        <Controller
          control={form.control}
          name="username"
          render={({ field }) => (
            <TextField
              placeholder="Username"
              value={field.value}
              onChangeText={field.onChange}
              errored={!!form.formState.errors.username}
            />
          )}
        />

        <Button title="Submit" onPress={form.handleSubmit(handleSubmit)} />
      </View>
    </Container>
  );
};

export default SignUpScreen;
