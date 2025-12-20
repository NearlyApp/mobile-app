import requester from '@lib/requester';
import * as Types from './users.types';

const BASE_URL = '/users';

export const fetchMe = async () =>
  requester().get<Types.FetchMeResponse>(`${BASE_URL}/me`);

export const fetchUser = async (uuid: string) =>
  requester().get<Types.FetchUserResponse>(`${BASE_URL}/${uuid}`);

export const fetchUsers = async () =>
  requester().get<Types.FetchUsersResponse>(BASE_URL);

