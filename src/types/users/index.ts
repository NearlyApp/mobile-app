import { User } from '@nearlyapp/common';

export type FetchMeResponse = User;

export type FetchUserResponse = User;

export type FetchUsersResponse = {
  users: User[];
};
