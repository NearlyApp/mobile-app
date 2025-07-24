import {
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
} from '@custom-types/auth';
import requester from '@lib/requester';

const BASE_URL = '/auth';

export const signUp = async (data: SignUpDto) =>
  requester().post<SignUpResponse>(`${BASE_URL}/sign-up`, data);

export const signIn = async (data: SignInDto) =>
  requester().post<SignInResponse>(`${BASE_URL}/sign-in`, data);

export const signOut = async () => requester().delete(`${BASE_URL}/sign-out`);
