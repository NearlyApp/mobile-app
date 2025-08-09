import {
  FetchMeResponse,
  FetchUserResponse,
  FetchUsersResponse,
} from '@/types/users';
import requester from '@lib/requester';

const BASE_URL = '/users';

export const fetchMe = async () =>
  requester().get<FetchMeResponse>(`${BASE_URL}/me`);

export const fetchUser = async (uuid: string) =>
  requester().get<FetchUserResponse>(`${BASE_URL}/${uuid}`);

export const fetchUsers = async () =>
  requester().get<FetchUsersResponse>(BASE_URL);
