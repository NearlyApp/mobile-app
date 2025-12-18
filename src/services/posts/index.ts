import * as Types from '@/types/posts';
import requester from '@lib/requester';

const BASE_URL = '/posts';

export const fetchPost = async (uuid: string) =>
  requester().get<Types.FetchPostResponse>(`${BASE_URL}/${uuid}`);

export const fetchPosts = async (params?: Types.FetchPostsQueryParams) =>
  requester().get<Types.FetchPostsResponse>(BASE_URL, {
    params,
  });

export const fetchPostsAuthor = async (
  authorUuid: string,
  params?: Types.FetchPostsQueryParams,
) =>
  requester().get<Types.FetchPostsResponse>(
    `${BASE_URL}/author/${authorUuid}`,
    {
      params,
    },
  );

export const createPost = async (data: Types.CreatePostDto) =>
  requester().post<Types.CreatePostResponse>(BASE_URL, data);

export const fetchRecommendedPosts = async (
  params: Types.FetchRecommendedPostsQueryParams,
) =>
  requester().get<Types.FetchRecommendedPostsResponse>(
    `${BASE_URL}/recommend/`,
    {
      params,
    },
  );
