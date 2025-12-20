import { Post, PrivateUser, PublicUser } from '@nearlyapp/common';

export type FetchMeResponse = PrivateUser;

export type FetchUserResponse = PublicUser;

export type FetchUserPostsQueryParams = {
  page?: number;
  limit?: number;
};

export type FetchUserPostsResponse = {
  posts: Post[];
};

export type FetchUsersResponse = {
  users: PublicUser[];
};
