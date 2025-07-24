import { User } from '@nearlyapp/common';

export type SignInDto = {
  login: string;
  password: string;
  rememberMe?: boolean;
};

export type SignInResponse = User;

export type SignUpDto = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponse = User;
