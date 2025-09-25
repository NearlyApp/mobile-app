import * as Types from '@/types/auth';
import requester from '@lib/requester';

const BASE_URL = '/auth';

export const signUp = async (data: Types.SignUpDto) =>
  requester().post<Types.SignUpResponse>(`${BASE_URL}/sign-up`, data);

export const signIn = async (data: Types.SignInDto) =>
  requester().post<Types.SignInResponse>(`${BASE_URL}/sign-in`, data);

export const signOut = async () => requester().delete(`${BASE_URL}/sign-out`);
