import { FetchUsersResponse } from '@custom-types/users';
import RequesterError from '@lib/requester/RequesterError';
import { fetchUsers } from '@services/users';
import { useQuery } from '@tanstack/react-query';

export const USERS_QUERY_KEY = () => ['users'];

const useUsers = () =>
  useQuery<FetchUsersResponse, RequesterError>({
    queryKey: USERS_QUERY_KEY(),
    queryFn: fetchUsers,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

export default useUsers;
