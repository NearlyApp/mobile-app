import { User } from '@nearlyapp/common';
import { signUpSchema } from '@schemas/auth';
import z from 'zod';

export type SignInDto = {
  login: string;
  password: string;
  rememberMe?: boolean;
};

export type SignInResponse = User;

export type SignUpDto = Omit<z.infer<typeof signUpSchema>, 'confirmPassword'>;

export type SignUpResponse = User;
