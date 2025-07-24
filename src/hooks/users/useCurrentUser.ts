import { FetchMeResponse } from '@custom-types/users';
import RequesterError from '@lib/requester/RequesterError';
import { fetchMe } from '@services/users';
import { useQuery } from '@tanstack/react-query';

export const CURRENT_USER_QUERY_KEY = () => ['users', 'me'];

const useCurrentUser = () =>
  useQuery<FetchMeResponse, RequesterError>({
    queryKey: CURRENT_USER_QUERY_KEY(),
    queryFn: fetchMe,
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

export default useCurrentUser;
