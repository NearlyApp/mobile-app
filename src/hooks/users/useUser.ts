import { fetchUser } from '@services/users';
import { useQuery } from '@tanstack/react-query';

const USER_QUERY_KEY = (uuid: string) => ['users', uuid];

const useUser = (uuid: string) =>
  useQuery({
    queryKey: USER_QUERY_KEY(uuid),
    queryFn: () => fetchUser(uuid),
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!uuid,
  });

export default useUser;
