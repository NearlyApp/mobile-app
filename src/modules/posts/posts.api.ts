import requester from '@lib/requester';
import * as Types from '@modules/posts/posts.types';

const BASE_URL = '/posts';

export const fetchPost = async (uuid: string) =>
  requester().get<Types.FetchPostResponse>(`${BASE_URL}/${uuid}`);

export const createPost = async (data: Types.CreatePostDto) =>
  requester().post<Types.CreatePostResponse>(BASE_URL, data, {
    timeout: 15_000, // 15 seconds
  });

export const fetchRecommendedPosts = async (
  params: Types.FetchRecommendedPostsQueryParams,
) =>
  requester().get<Types.FetchRecommendedPostsResponse>(
    `${BASE_URL}/recommend/`,
    {
      params,
      timeout: 30_000, // 30 seconds
    },
  );
