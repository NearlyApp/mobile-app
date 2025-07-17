import { fetchUsers } from '@services/users';
import { useQuery } from '@tanstack/react-query';

export const USE_USERS_QUERY_KEY = () => ['users'];

const useUsers = () =>
  useQuery({
    queryKey: USE_USERS_QUERY_KEY(),
    queryFn: async () => fetchUsers(),
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    select: (data) => data.data,
  });

export default useUsers;
