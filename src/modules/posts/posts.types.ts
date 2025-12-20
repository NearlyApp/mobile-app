import { Altitude, Latitude, Longitude, Post } from '@nearlyapp/common';

export type FetchPostResponse = Post;

export type CreatePostDto = {
  content: string;
  parentPostUuid?: string;
  lat: Latitude;
  lng: Longitude;
  alt?: Altitude;
};

export type CreatePostResponse = unknown;

export type FetchRecommendedPostsQueryParams = {
  lat: Latitude;
  lng: Longitude;
};

export type FetchRecommendedPostsResponse = {
  posts: Post[];
};
