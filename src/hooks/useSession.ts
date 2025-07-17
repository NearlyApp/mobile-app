import { User } from '@custom-types/user';
import { get } from '@lib/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useSession = (): UseQueryResult<User> => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => get<User>('/users/me/'),
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export default useSession;
