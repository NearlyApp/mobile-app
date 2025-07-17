import { fetchMe } from '@services/users';
import { useQuery } from '@tanstack/react-query';

export const USE_SESSION_QUERY_KEY = () => ['session'];

const useSession = useQuery({
  queryKey: USE_SESSION_QUERY_KEY(),
  queryFn: async () => fetchMe(),
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
});

export default useSession;