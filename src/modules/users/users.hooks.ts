import RequesterError from '@lib/requester/RequesterError';
import { useQuery } from '@tanstack/react-query';
import * as Api from './users.api';
import * as Types from './users.types';

const QUERY_KEYS = {
  currentUser: () => ['users', 'me'],
  user: (uuid: string) => ['users', uuid],
  users: () => ['users'],
} as const;

export const useCurrentUser = () =>
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
  });

export const useUser = (uuid: string) =>
  useQuery<Types.FetchUserResponse, RequesterError>({
    queryKey: QUERY_KEYS.user(uuid),
    queryFn: () => Api.fetchUser(uuid),
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!uuid,
  });

export const useUsers = () =>
  useQuery<Types.FetchUsersResponse, RequesterError>({
    queryKey: QUERY_KEYS.users(),
    queryFn: Api.fetchUsers,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

export { QUERY_KEYS as USERS_QUERY_KEYS };

