import RequesterError from '@lib/requester/RequesterError';
import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as Api from './posts.api';
import * as Types from './posts.types';

const QUERY_KEYS = {
  postsByAuthorUuid: (authorUuid: string) => ['posts', 'author', authorUuid],
  recommendedPosts: (params?: Types.FetchRecommendedPostsQueryParams) => [
    'posts',
    'recommended',
    params?.lat,
    params?.lng,
  ],
} as const;

const MUTATION_KEYS = {
  createPost: () => ['posts', 'create'],
} as const;

export const useCreatePost = () =>
  useMutation<Types.CreatePostResponse, RequesterError, Types.CreatePostDto>({
    mutationKey: MUTATION_KEYS.createPost(),
    mutationFn: Api.createPost,
  });

export const usePostsByAuthorUuid = (
  authorUuid: string,
  options?: UseQueryOptions<
    Types.FetchPostsByAuthorUuidResponse,
    RequesterError,
    Types.FetchPostsByAuthorUuidResponse['posts']
  >,
) =>
  useQuery<
    Types.FetchPostsByAuthorUuidResponse,
    RequesterError,
    Types.FetchPostsByAuthorUuidResponse['posts']
  >({
    queryKey: QUERY_KEYS.postsByAuthorUuid(authorUuid),
    queryFn: () => Api.fetchPostsByAuthorUuid(authorUuid),
    select: (data) => data.posts,
    ...(options ?? {}),
  });

export const useRecommendedPosts = (
  params?: Types.FetchRecommendedPostsQueryParams,
  options?: UseQueryOptions<
    Types.FetchRecommendedPostsResponse,
    RequesterError,
    Types.FetchRecommendedPostsResponse['posts']
  >,
) =>
  useQuery<
    Types.FetchRecommendedPostsResponse,
    RequesterError,
    Types.FetchRecommendedPostsResponse['posts']
  >({
    queryKey: QUERY_KEYS.recommendedPosts(params),
    queryFn: () => Api.fetchRecommendedPosts(params!),
    enabled: !!params?.lat && !!params?.lng,
    select: (data) => data.posts,
    ...(options ?? {}),
  });

export { MUTATION_KEYS as POSTS_MUTATION_KEYS, QUERY_KEYS as POSTS_QUERY_KEYS };
