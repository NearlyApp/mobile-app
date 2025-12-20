import { PrivateUser } from '@nearlyapp/common';
import z from 'zod';
import { signUpSchema } from './auth.schemas';

export type SignInDto = {
  login: string;
  password: string;
  rememberMe?: boolean;
};

export type SignInResponse = PrivateUser;

export type SignUpDto = Omit<z.infer<typeof signUpSchema>, 'confirmPassword'>;

export type SignUpResponse = PrivateUser;
