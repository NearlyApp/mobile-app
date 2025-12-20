import requester from '@lib/requester';
import * as Types from '@modules/posts/posts.types';

const BASE_URL = '/posts';

export const fetchPost = async (uuid: string) =>
  requester().get<Types.FetchPostResponse>(`${BASE_URL}/${uuid}`);

export const fetchPostsByAuthorUuid = async (
  authorUuid: string,
  params?: Types.FetchPostsByAuthorUuidQueryParams,
) =>
  requester().get<Types.FetchPostsByAuthorUuidResponse>(
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
