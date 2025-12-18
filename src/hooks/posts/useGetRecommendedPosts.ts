import {
  FetchRecommendedPostsQueryParams,
  FetchRecommendedPostsResponse,
} from '@/types/posts';
import RequesterError from '@lib/requester/RequesterError';
import { fetchRecommendedPosts } from '@services/posts';
import { useQuery } from '@tanstack/react-query';

export const GET_RECOMMENDED_POSTS_QUERY_KEY = (
  params: FetchRecommendedPostsQueryParams,
) => ['posts', 'recommended', params];

const useGetRecommendedPosts = (params?: FetchRecommendedPostsQueryParams) =>
  useQuery<FetchRecommendedPostsResponse, RequesterError>({
    queryKey: GET_RECOMMENDED_POSTS_QUERY_KEY(params),
    queryFn: () => fetchRecommendedPosts(params),
    enabled: !!params?.lat && !!params?.lng,
  });

export default useGetRecommendedPosts;
