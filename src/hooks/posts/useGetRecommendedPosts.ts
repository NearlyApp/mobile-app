import RequesterError from '@lib/requester/RequesterError';
import { Post } from '@nearlyapp/common';
import { fetchRecommendedPosts } from '@services/posts';
import { useQuery } from '@tanstack/react-query';

export const GET_RECOMMENDED_POSTS_QUERY_KEY = () => ['posts', 'recommended'];

const useGetRecommendedPosts = () =>
  useQuery<Post[], RequesterError>({
    queryKey: GET_RECOMMENDED_POSTS_QUERY_KEY(),
    queryFn: () => fetchRecommendedPosts(),
  });

export default useGetRecommendedPosts;
