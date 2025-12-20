import requester from '@lib/requester';
import * as Types from './auth.types';

const BASE_URL = '/auth';

export const signUp = async (data: Types.SignUpDto) =>
  requester().post<Types.SignUpResponse>(`${BASE_URL}/sign-up`, data);

export const signIn = async (data: Types.SignInDto) =>
  requester().post<Types.SignInResponse>(`${BASE_URL}/sign-in`, data);

export const signOut = async () => requester().delete(`${BASE_URL}/sign-out`);

