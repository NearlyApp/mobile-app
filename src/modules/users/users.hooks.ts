import RequesterError from '@lib/requester/RequesterError';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as Api from './users.api';
import * as Types from './users.types';

const QUERY_KEYS = {
  currentUser: () => ['users', 'me'],
  user: (uuid: string) => ['users', uuid],
  userPosts: (uuid: string, params?: Types.FetchUserPostsQueryParams) => ['users', uuid, 'posts', params?.page, params?.limit],
  users: () => ['users'],
} as const;

export const useCurrentUser = (options: Omit<UseQueryOptions<Types.FetchMeResponse, RequesterError>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery<Types.FetchMeResponse, RequesterError>({
    queryKey: QUERY_KEYS.currentUser(),
    queryFn: Api.fetchMe,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: (count, error) => {
      if (error.status === 401) return false;
      return count < 3;
    },
    ...options
  });

export const useUser = (uuid: string, options: Omit<UseQueryOptions<Types.FetchUserResponse, RequesterError>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery<Types.FetchUserResponse, RequesterError>({
    queryKey: QUERY_KEYS.user(uuid),
    queryFn: () => Api.fetchUser(uuid),
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!uuid,
    ...options
  });

export const useUserPosts = (uuid: string, params?: Types.FetchUserPostsQueryParams, options: Omit<UseQueryOptions<Types.FetchUserPostsResponse, RequesterError, Types.FetchUserPostsResponse['posts']>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery<Types.FetchUserPostsResponse, RequesterError, Types.FetchUserPostsResponse['posts']>({
    queryKey: QUERY_KEYS.userPosts(uuid, params),
    queryFn: () => Api.fetchUserPosts(uuid, params),
    select: (data) => data.posts,
    enabled: !!uuid,
    ...options
  });

export const useUsers = (options: Omit<UseQueryOptions<Types.FetchUsersResponse, RequesterError>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery<Types.FetchUsersResponse, RequesterError>({
    queryKey: QUERY_KEYS.users(),
    queryFn: Api.fetchUsers,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    ...options
  });

export { QUERY_KEYS as USERS_QUERY_KEYS };

