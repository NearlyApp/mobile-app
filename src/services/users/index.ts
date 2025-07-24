import { FetchMeResponse, FetchUsersResponse } from '@custom-types/users';
import requester from '@lib/requester';

const BASE_URL = '/users';

export const fetchMe = async () =>
  requester().get<FetchMeResponse>(`${BASE_URL}/me`);

export const fetchUsers = async () =>
  requester().get<FetchUsersResponse>(BASE_URL);
