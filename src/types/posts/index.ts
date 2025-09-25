import { Post } from '@nearlyapp/common';

export type FetchPostResponse = Post;

export type FetchPostsQueryParams = {
  page?: number;
  limit?: number;
};

export type FetchPostsResponse = {
  posts: Post[];
};
