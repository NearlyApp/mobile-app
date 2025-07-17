import requester from '@lib/requester';
import { User } from '@nearlyapp/common';

const BASE_URL = '/users';

export const fetchMe = async () => requester().get<User>(`${BASE_URL}/me`);
export const fetchUsers = async () =>
  requester().get<{ users: User[] }>(BASE_URL);
