import { Altitude, Latitude, Longitude, Post } from '@nearlyapp/common';

export type FetchPostResponse = Post;

export type FetchPostsQueryParams = {
  page?: number;
  limit?: number;
};

export type FetchPostsResponse = {
  posts: Post[];
};

export type CreatePostDto = {
  content: string;
  parentPostUuid?: string;
  lat: Latitude;
  lng: Longitude;
  alt?: Altitude;
};

export type CreatePostResponse = unknown;
